#!/bin/bash
set -e

# Load configuration
if [ -f "$(dirname "$0")/deploy-config.sh" ]; then
  source "$(dirname "$0")/deploy-config.sh"
else
  echo "Error: deploy-config.sh not found!"
  echo "Please create it by copying deploy-config.example.sh and setting your values."
  exit 1
fi

# Verify required variables
if [ -z "$S3_BUCKET" ] || [ -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
  echo "Error: Required configuration variables not set in deploy-config.sh"
  exit 1
fi

echo "🏗️  Building documentation for production..."
npm run docs:build
read -p "✓ Build completed. Press Enter to continue..." input

# The VitePress build output directory
BUILD_DIR="docs/.vitepress/dist"

if [ ! -d "$BUILD_DIR" ]; then
  echo "Error: Build directory $BUILD_DIR not found!"
  exit 1
fi

echo "🚀 Uploading to S3 bucket: $S3_BUCKET..."
aws s3 sync "$BUILD_DIR" "s3://$S3_BUCKET" \
  --delete \
  --acl public-read \
  ${AWS_REGION:+--region "$AWS_REGION"}
read -p "✓ S3 upload completed. Press Enter to continue with CloudFront invalidation..." input

echo "🔄 Creating CloudFront invalidation..."
INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
  --paths "/*" \
  ${AWS_REGION:+--region "$AWS_REGION"} \
  --query 'Invalidation.Id' \
  --output text)
read -p "✓ CloudFront invalidation initiated. Press Enter to finish..." input

echo "✅ Deployment completed successfully!"
echo "CloudFront invalidation created: $INVALIDATION_ID"
echo "Your documentation will be available once the invalidation completes." 

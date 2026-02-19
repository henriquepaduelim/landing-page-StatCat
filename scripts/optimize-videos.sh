#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MEDIA_DIR="$ROOT_DIR/public/media"
FFMPEG_BIN="$(node -e "console.log(require('ffmpeg-static'))")"

if [[ ! -x "$FFMPEG_BIN" ]]; then
  echo "ffmpeg-static binary not found: $FFMPEG_BIN"
  exit 1
fi

echo "Using ffmpeg: $FFMPEG_BIN"

"$FFMPEG_BIN" -y \
  -i "$MEDIA_DIR/herolanding.mp4" \
  -vf "scale='min(1280,iw)':-2:force_original_aspect_ratio=decrease,fps=24" \
  -an -c:v libx264 -preset slow -crf 28 -movflags +faststart \
  "$MEDIA_DIR/herolanding.tmp.mp4"

"$FFMPEG_BIN" -y \
  -i "$MEDIA_DIR/EliteOneGoalkeepers.webm" \
  -vf "scale='min(960,iw)':-2:force_original_aspect_ratio=decrease,fps=24" \
  -an -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 -cpu-used 3 \
  "$MEDIA_DIR/EliteOneGoalkeepers.tmp.webm"

"$FFMPEG_BIN" -y \
  -i "$MEDIA_DIR/combineChart.webm" \
  -vf "scale='min(960,iw)':-2:force_original_aspect_ratio=decrease,fps=24" \
  -an -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 -cpu-used 3 \
  "$MEDIA_DIR/combineChart.tmp.webm"

mv "$MEDIA_DIR/herolanding.tmp.mp4" "$MEDIA_DIR/herolanding.mp4"
mv "$MEDIA_DIR/EliteOneGoalkeepers.tmp.webm" "$MEDIA_DIR/EliteOneGoalkeepers.webm"
mv "$MEDIA_DIR/combineChart.tmp.webm" "$MEDIA_DIR/combineChart.webm"

echo "Video optimization complete."
ls -lh "$MEDIA_DIR/herolanding.mp4" "$MEDIA_DIR/EliteOneGoalkeepers.webm" "$MEDIA_DIR/combineChart.webm"

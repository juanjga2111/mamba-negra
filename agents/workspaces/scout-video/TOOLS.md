# TOOLS.md -- Scout Video Worker

## reel-analyzer CLI

Descarga y analisis de videos de redes sociales.

```bash
# Descargar video
reel-analyzer download "https://www.instagram.com/reel/ABC123/" --output /tmp/scout-video/

# Descargar + analizar en un paso (si soportado)
reel-analyzer analyze "https://www.instagram.com/reel/ABC123/"
```

Soporta: Instagram Reels, TikTok videos, YouTube Shorts.

## yt-dlp (fallback)

Si reel-analyzer falla, usa yt-dlp directamente:

```bash
# Descargar
yt-dlp -o "/tmp/scout-video/%(id)s.%(ext)s" "https://www.tiktok.com/@user/video/123"

# Con cookies para Instagram (si necesario)
yt-dlp --cookies ~/.config/yt-dlp/cookies.txt -o "/tmp/scout-video/%(id)s.%(ext)s" "https://www.instagram.com/reel/ABC123/"
```

## Archivos temporales

Siempre usa `/tmp/scout-video/` para descargas. Limpia despues:
```bash
mkdir -p /tmp/scout-video
rm -f /tmp/scout-video/*
```

## NO usar

- No uses hypeauditor — eso es scout-report
- No uses Tavily — eso es scout-report
- No busques mas perfiles — tu trabajo es analizar UN video

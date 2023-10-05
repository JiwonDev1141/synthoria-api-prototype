import { Controller, Get, Header, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { Headers } from '@nestjs/common';
import { createReadStream, statSync } from 'fs';

@Controller('video')
export class VideoController {
  @Get('/:filename')
  @Header('Accept-Ranges', 'bytes')
  @Header('Content-Type', 'video/mp4')
  async getStreamVideo(@Param('filename') filename: string, @Headers() headers: any, @Res() res: Response) {
    const videoPath = `assets/${filename}`;
    const { size } = statSync(videoPath);
    const videoRange = headers.range;
    if (videoRange) {
      const parts = videoRange.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
      const chunksize = end - start + 1;
      const readStreamfile = createReadStream(videoPath, { start, end, highWaterMark: 60 });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Content-Length': chunksize,
      };
      res.writeHead(HttpStatus.PARTIAL_CONTENT, head); //206
      readStreamfile.pipe(res);
    } else {
      const head = {
        'Content-Length': size,
      };
      res.writeHead(HttpStatus.OK, head); //200
      createReadStream(videoPath).pipe(res);
    }
  }
}

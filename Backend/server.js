const express = require('express');
const cors = require('cors');
const qrcode = require('qrcode');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// AWS S3 Configuration using AWS SDK v3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const bucketName = 'qr-code-bucket12';

app.post('/generate-qr/', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Invalid URL' });
    }

    // Generate QR Code
    const qr = await qrcode.toBuffer(url, {
      errorCorrectionLevel: 'L',
      margin: 4,
      width: 300,
    });

    // A unique filename for each QR code
    const timestamp = Date.now();
    const safeUrl = url.replace(/[^a-zA-Z0-9]/g, '_');
    const fileName = `qr_codes/${safeUrl}_${timestamp}.png`;

    // Upload to S3
    const uploadParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: qr,
      ContentType: 'image/png',
    };

    await s3.send(new PutObjectCommand(uploadParams));

    // Generate the S3 URL
    const s3Url = `https://${bucketName}.s3.amazonaws.com/${fileName}`;
    
    res.json({ qr_code_url: s3Url });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

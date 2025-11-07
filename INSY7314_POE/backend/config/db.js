import https from "https";
import http from "http";
import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from 'path';   

//db.js (freeCodeCamp.org, 2024; IIE, 2025)

dotenv.config();

const homeDirect = process.env.USERPROFILE;   
const mkcertDirect = path.join(homeDirect, ".vite-plugin-mkcert");

const certPath = path.join(mkcertDirect, "cert.pem"); 
const keyPath = path.join(mkcertDirect, "dev.pem");

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';
const useHttps = process.env.USE_HTTPS || true;
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('Missing MONGO_URI');
  process.exit(1);
}

export const connectDB = async (app) => { 
    try {
        const conn = await mongoose.connect(mongoUri);
        console.log("MongoDB connected: "+conn.connection.host)

        if (useHttps) {
            const privatekeyPath = keyPath;
            const certificatePath = certPath;
            const filesPresent = fs.existsSync(privatekeyPath) && fs.existsSync(certificatePath);

            if (!filesPresent) {
                console.warn('SSL files not found, falling back to HTTP');
            } else {
                const options = {
                    key: fs.readFileSync(privatekeyPath),
                    cert: fs.readFileSync(certificatePath),
                };
                https.createServer(options, app).listen(PORT, HOST, () => {
                    console.log(`HTTPS server running at https://localhost:${PORT}`);
                });
                return; // Exit after starting HTTPS server
            }
        }

        http.createServer(app).listen(PORT, HOST, () => {
            console.log(`HTTP server running at http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("Error: "+error.message);
        process.exit(1); //0 = fail, 1 = success freeCodeCamp.org (2024)
    }
};

/*
Reference list:
MERN Stack Tutorial with Deployment – Beginner's Course. 2024. YouTube video, added by freeCodeCamp.org. [Online]. Available at: https://www.youtube.com/watch?v=O3BUHwfHf84&t=1620s [Accessed 3 October 2025]. 
The Independent Instatute of Education (IIE), 2025. Information Systems 3D [INSY7314 Lab Guide 2025]. The Independent Instatute of Education: Unpublished.
*/
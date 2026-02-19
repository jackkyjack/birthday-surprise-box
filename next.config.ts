/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // สำคัญมาก: เพื่อให้รันบน GitHub Pages ได้
  images: {
    unoptimized: true, // เพื่อให้รูปภาพในโปรเจกต์แสดงผลได้โดยไม่ต้องใช้ Image Optimization ของ Next.js
  },
};

export default nextConfig;
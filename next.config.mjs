/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Vercel Blob URLs (used for uploaded mockup screenshots).
    // Each Blob store gets a unique subdomain like
    //   "https://abc123xyz.public.blob.vercel-storage.com/..." — we whitelist
    // any subdomain of public.blob.vercel-storage.com.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
}

export default nextConfig

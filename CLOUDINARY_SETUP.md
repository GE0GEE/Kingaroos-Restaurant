# Cloudinary Image Upload Setup

The Admin panel can upload images directly to **Cloudinary** instead of saving large base64 strings in Firestore. This makes the database faster, the site quicker to load, and gives you automatic image optimization.

If Cloudinary is **not** configured, the app falls back to local compression + base64 storage, so existing images continue to work.

## 1. Create a free Cloudinary account

Go to [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free) and sign up. The free tier includes 25 credits/month which is plenty for a small restaurant site.

## 2. Find your Cloud Name

After login, go to the **Dashboard**. Look for the field labelled **"Cloud name"** at the top — copy that value.

## 3. Create an Unsigned Upload Preset

Uploads from the browser must use an **unsigned** preset (so we never expose your API secret).

1. Go to **Settings** → **Upload** → **Upload presets**
2. Click **"Add upload preset"**
3. Set:
   - **Preset name**: e.g. `kingaroos_unsigned`
   - **Signing Mode**: **Unsigned** (important!)
   - **Folder**: `kingaroos` (optional but recommended)
4. Under **Upload Manipulations**, enable:
   - **Auto-format** (`f_auto`) — serves WebP/AVIF when supported
   - **Auto-quality** (`q_auto`) — automatic quality optimization
   - **Optional**: set max width/height (e.g. 2000 px) under "Incoming Transformations" to cap upload size
5. Save the preset and copy its name.

## 4. Set environment variables

Add these to your `.env` file (and to your hosting provider's env vars in production):

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=kingaroos_unsigned
VITE_CLOUDINARY_FOLDER=kingaroos
```

## 5. Restart the dev server

```bash
npm run dev
```

That's it. The next image you upload from the Admin panel will go straight to Cloudinary and only the URL will be saved in Firebase.

## Security notes

- The **upload preset must be unsigned**. Signed presets require your API secret which must NEVER be in client code.
- You can restrict the preset on Cloudinary (allowed formats, max size, allowed folders) for extra safety.
- The `VITE_` prefix means these values are public — that's fine for `cloud_name` and an unsigned `upload_preset`. Never put your `api_secret` in a `VITE_` variable.

## Fallback behavior

If Cloudinary returns an error or isn't configured, uploads automatically fall back to the old base64 method, so the Admin panel never breaks.

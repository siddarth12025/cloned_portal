# Deployment Instructions for Hostinger

This document provides step-by-step instructions to deploy the Offer Portal application to Hostinger.

---

## Step 7: Verify Mobile Compatibility

1. Open your application on a mobile device or use a browser's developer tools to simulate a mobile viewport.
2. Ensure that the layout and functionality are responsive and work as expected.
3. Address any issues with responsiveness or usability before considering the deployment complete.

---

## Prerequisites

Before deploying, ensure you have the following:

1. **Hostinger Account**: A valid Hostinger account with access to the hosting dashboard.
2. **Domain**: A domain name configured in your Hostinger account (optional if using a subdomain).
3. **Node.js and npm**: Installed locally to build the project.
4. **FTP Client**: (e.g., FileZilla) or access to the Hostinger File Manager.

---

## Step 1: Build the Project

1. Clone the repository to your local machine if not already done:
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project for production:
   ```bash
   npm run build
   ```

   This will generate a `dist` folder containing the production-ready files. Ensure that the `dist` folder includes all necessary files such as `index.html`, `assets`, and other static resources before proceeding to the next step.

---

## Step 2: Configure Hostinger Hosting

1. Log in to your Hostinger account and navigate to the **Hosting** section.

2. Select the hosting plan or domain where you want to deploy the application.

3. Go to the **File Manager** or set up an **FTP Client** (e.g., FileZilla) to upload files.

4. If using a subdomain, ensure it is configured in the **Domains** section.

---

## Step 3: Upload Files

1. Navigate to the `public_html` directory (or the root directory of your subdomain).

2. Delete any existing files (e.g., `index.html`) to avoid conflicts.

3. Upload the contents of the `dist` folder (generated in Step 1) to the `public_html` directory.

   - If using FileZilla:
     - Connect to your Hostinger account using the FTP credentials provided in the **FTP Accounts** section.
     - Drag and drop the contents of the `dist` folder into the `public_html` directory.

   - If using the Hostinger File Manager:
     - Click **Upload Files** and select the files from the `dist` folder.

---

## Step 4: Configure Domain (Optional)

If deploying to a custom domain:

1. Go to the **Domains** section in Hostinger.

2. Ensure the domain is pointing to the correct hosting plan.

3. Update the DNS settings if necessary:
   - Set the A record to point to your Hostinger server's IP address.
   - Set the CNAME record for `www` to point to your domain.

---

## Step 5: Test the Deployment

1. Open your browser and navigate to your domain or subdomain.

2. Verify that the application is loading correctly.

3. If you encounter any issues:
   - Check the **Error Logs** in the Hostinger dashboard.
   - Ensure all files were uploaded correctly.
   - Verify that the `dist` folder was built correctly and contains all required files.
   - Check your browser's developer console for errors and ensure all assets are loading properly.

---

## Step 6: Enable HTTPS (Optional)

1. Go to the **SSL** section in the Hostinger dashboard.

2. Enable a free SSL certificate for your domain.

3. Once enabled, update the `vite.config.ts` file to ensure HTTPS is used:
   ```javascript
   server: {
     host: "::",
     port: 8080,
     https: true,
   },
   ```

4. Rebuild and re-upload the project if necessary.

---

## Additional Notes

- **Environment Variables**: If your application requires environment variables, configure them in the Hostinger dashboard under **Advanced > Environment Variables**.
- **Caching**: Clear your browser cache if changes are not reflected after deployment.
- **Support**: For any issues, contact Hostinger support via the **Help** section in the dashboard.

---

Congratulations! Your Offer Portal application is now live on Hostinger.
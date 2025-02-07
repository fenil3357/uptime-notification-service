interface FailedReport {
  time: string;
  errorMessage: string;
  errorJson?: string;
}

const generateMonitorDownEmailTemplate = (
  userName: string,
  monitorName: string,
  type: "website" | "api",
  url: string,
  monitorPageUrl: string,
  failedReport: FailedReport
): string => {
  const subject = `[Action Required] Your ${type} ${monitorName} is Down`;
  const monitorType = type.toUpperCase();
  const statusColor = "#e74c3c";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
                padding: 20px !important;
            }
            .content {
                padding: 15px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f6fa;">
    <div class="container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <div style="padding: 25px; background-color: ${statusColor}; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">StatusMonitor Pro</h1>
        </div>

        <!-- Content -->
        <div class="content" style="padding: 30px;">
            <h2 style="color: #2c3e50; margin-top: 0;">${subject}</h2>
            <p style="color: #7f8c8d;">Hi ${userName},</p>
            <p style="color: #7f8c8d;">We detected an issue with your ${monitorType} monitor. Here are the details:</p>

            <!-- Monitor Details -->
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                <table>
                    <tr>
                        <td style="color: #7f8c8d; padding: 5px 10px 5px 0;">Monitor Name:</td>
                        <td style="font-weight: bold; color: #2c3e50;">${monitorName}</td>
                    </tr>
                    <tr>
                        <td style="color: #7f8c8d; padding: 5px 10px 5px 0;">Type:</td>
                        <td style="color: ${statusColor};">${monitorType}</td>
                    </tr>
                    <tr>
                        <td style="color: #7f8c8d; padding: 5px 10px 5px 0;">URL:</td>
                        <td><a href="${url}" style="color: #3498db; text-decoration: none;">${url}</a></td>
                    </tr>
                </table>
            </div>

            <!-- Failure Report -->
            <h3 style="color: #2c3e50;">Failure Details</h3>
            <div style="background-color: #fff5f5; padding: 20px; border-left: 4px solid ${statusColor}; margin: 15px 0;">
                <p style="margin: 0 0 10px 0;"><strong>Time:</strong> ${failedReport.time}</p>
                <p style="margin: 0 0 10px 0;"><strong>Error:</strong> ${failedReport.errorMessage}</p>
                ${failedReport.errorJson ? `
                <div style="background-color: #ffffff; padding: 10px; margin: 10px 0; border-radius: 3px;">
                    <pre style="font-family: monospace; font-size: 12px; margin: 0; color: #e74c3c;">${failedReport.errorJson}</pre>
                </div>
                ` : ''}
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="${monitorPageUrl}" style="background-color: ${statusColor}; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
                    View Monitor Details
                </a>
            </div>

            <!-- Footer -->
            <div style="border-top: 1px solid #ecf0f1; padding-top: 20px; text-align: center;">
                <p style="color: #7f8c8d; font-size: 12px;">
                    © 2024 StatusMonitor Pro. All rights reserved.<br>
                    Need help? <a href="mailto:support@statusmonitorpro.com" style="color: #3498db;">Contact our support team</a><br>
                    <a href="#" style="color: #3498db; text-decoration: none;">Privacy Policy</a> | 
                    <a href="#" style="color: #3498db; text-decoration: none;">Unsubscribe</a>
                </p>
            </div>
        </div>
    </div>
</body>
</html>
`;
}

export default generateMonitorDownEmailTemplate;

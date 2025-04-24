const generateReportHtml = (doc) => {
  // Add this debug log

  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  // Generate brochure images HTML
  const brochureImagesHtml =
    doc.brochureImages && doc.brochureImages.length > 0
      ? doc.brochureImages
          .map(
            (image) => `
      <img 
        src="${image.url || image}"
        alt="Event Brochure"
        style="width: 400px; height: 300px; object-fit: cover; margin: 10px;"
      />
    `
          )
          .join("")
      : "";

  // Generate event photos HTML
  const eventPhotosHtml =
    doc.eventPhotographs && doc.eventPhotographs.length > 0
      ? doc.eventPhotographs
          .map(
            (photo) => `
      <img 
        src="${photo.url || photo}"
        alt="Event Photo"
        style="width: 300px; height: 200px; object-fit: cover; margin: 10px;"
      />
    `
          )
          .join("")
      : "";

  // Generate certificates HTML
  const certificatesHtml =
    doc.certificates && doc.certificates.length > 0
      ? doc.certificates
          .map(
            (certificate) => `
      <img 
        src="${certificate.url || certificate}"
        alt="Certificate"
        style="width: 400px; height: 300px; object-fit: contain; margin: 10px;"
      />
    `
          )
          .join("")
      : "";

  // Generate participants list HTML
  const participantsListHtml =
    doc.participantsList && doc.participantsList.length > 0
      ? doc.participantsList
          .map(
            (participant) => `
      <img 
        src="${participant.url || participant}"
        alt="Participant List"
        style="width: 300px; height: 200px; object-fit: cover; margin: 10px;"
      />
    `
          )
          .join("")
      : "";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${doc.activityTitle || "Activity"}-Report</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }

      .report-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 30px;
      }

      .report-table td {
        border: 1px solid #ccc;
        padding: 12px;
        vertical-align: top;
      }

      .report-table td:first-child {
        width: 30%;
        font-weight: bold;
        background-color: #f9f9f9;
      }

      .report-table td:last-child {
        width: 70%;
      }

      .participant-list {
        list-style-type: decimal;
        padding-left: 20px;
        margin: 0;
      }

      .participant-list li {
        margin-bottom: 10px;
      }

      .photos {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        justify-content: center;
      }

      .photos img {
        max-width: 100%;
        height: auto;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .brochure-image img {
        width: 400px;
        height: 300px;
        object-fit: cover;
      }

      .event-photo img {
        width: 300px;
        height: 200px;
        object-fit: cover;
      }

      .signatures {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        font-style: italic;
      }

      .signature {
        text-align: center;
        width: 45%;
      }

      .signature-line {
        margin-top: 50px;
        border-top: 1px solid #333;
        padding-top: 10px;
      }

      @media (max-width: 600px) {
        .report-table td:first-child {
          width: 40%;
        }

        .report-table td:last-child {
          width: 60%;
        }

        .signatures {
          flex-direction: column;
          gap: 30px;
        }

        .signature {
          width: 100%;
        }
      }

      .certificates-container img {
        width: 400px;
        height: 300px;
        object-fit: contain;
        margin: 10px 0;
      }

      .header-image {
        width: 100%;
        margin-bottom: 20px;
        height: 120px; /* Added fixed height */
      }

      .footer-image {
        width: 100%;
        margin-top: 20px;
        height: 120px; /* Added fixed height */
      }

      .header-image img,
      .footer-image img {
        width: 100%;
        height: 100%; /* Changed from auto to 100% */
        display: block;
        object-fit: cover; /* Added to maintain aspect ratio */
      }
    </style>
  </head>
  <body>
    <div class="header-image">
      <img
        src="https://pub-128de25d713747c98ad27ed7bf2a4256.r2.dev/kjcmt-header.jpg"
        alt="Header"
      />
    </div>

    <table class="report-table">
      <tr>
        <td>Title of Activity</td>
        <td>${doc.activityTitle || ""}</td>
      </tr>
      <tr>
        <td>Date</td>
        <td>${formatDate(doc.activityDate)}</td>
      </tr>
      <tr>
        <td>Department/Club/Cell</td>
        <td>${doc.departmentOrClub || ""}</td>
      </tr>
      <tr>
        <td>Total Participation of Students</td>
        <td>${doc.studentParticipants || "0"}</td>
      </tr>
      <tr>
        <td>Total Participation of Faculties</td>
        <td>${doc.facultyParticipants || "0"}</td>
      </tr>
      <tr>
        <td>Mode</td>
        <td>${capitalizeFirstLetter(doc.eventMode)}</td>
      </tr>
      <tr>
        <td>Report</td>
        <td>${doc.activityReport || ""}</td>
      </tr>
      <tr>
        <td>Feedback</td>
        <td>${doc.feedbackReceived || ""}</td>
      </tr>
      <tr>
        <td>Programme Outcome</td>
        <td>${doc.programmeOutcome || ""}</td>
      </tr>
      <tr>
        <td>Brochure</td>
        <td>
          <div class="photos brochure-image">
            ${brochureImagesHtml}
          </div>
        </td>
      </tr>
      <tr>
        <td>Photographs</td>
        <td>
          <div class="photos event-photo">
            ${eventPhotosHtml}
          </div>
        </td>
      </tr>
      <tr>
        <td>Participants List</td>
        <td>
          <div class="photos event-photo">
            ${participantsListHtml}
          </div>
        </td>
      </tr>
      <tr>
        <td>Certificates</td>
        <td>
          <div class="photos certificates-container">
            ${certificatesHtml}
          </div>
        </td>
      </tr>
    </table>

    <div class="signatures">
      <div class="signature">
        <div class="signature-line">Name & Signature of Co-ordinator</div>
        <div>${doc.coordinatorName || ""}</div>
      </div>
      <div class="signature">
        <div class="signature-line">Principal</div>
        <div>${doc.principalName || ""}</div>
      </div>
    </div>

    <div class="footer-image">
      <img
        src="https://pub-128de25d713747c98ad27ed7bf2a4256.r2.dev/kjcmt-footer.png"
        alt="Footer"
      />
    </div>
  </body>
</html>`;
};

module.exports = generateReportHtml;

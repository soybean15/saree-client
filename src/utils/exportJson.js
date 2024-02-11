export const exportData = (key) => {
    // Retrieve data from localStorage
    const data = JSON.parse(localStorage.getItem(key));

    // Convert data to JSON
    const jsonData = JSON.stringify(data);

    // Create a Blob
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.json');

    // Trigger a click event to download the file
    document.body.appendChild(link);
    link.click();

    // Clean up by revoking the temporary URL
    URL.revokeObjectURL(url);
  };

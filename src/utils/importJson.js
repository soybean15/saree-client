export const importJsonData = (file) => {
    const reader = new FileReader();
  
    reader.onload = (event) => {
      const jsonData = event.target.result;
      const parsedData = JSON.parse(jsonData);
  
      // Store the parsed data in localStorage
      localStorage.setItem('yourDataKey', JSON.stringify(parsedData));
    };
  
    reader.readAsText(file);
  };
  
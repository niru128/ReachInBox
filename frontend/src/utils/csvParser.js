
export function parseEmailsFromFile(file,callback){

    const reader = new FileReader();

    reader.onload = () => {
        const text = reader.result;

        const emails = text
      .split(/[\n,]/)
      .map(e => e.trim())
      .filter(e => e.includes("@"));
      callback(emails);
    }

    reader.readAsText(file);
}
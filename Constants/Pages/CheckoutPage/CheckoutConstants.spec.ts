//Constants
export enum CHECKOUT_DETAILS {
    FIRST_NAME = "First Name",
    LAST_NAME = "Last Name",
    POSTAL_CODE = 2000
}



export  const extractAmount = (text: string | null): number => {
    if (!text) return 0; 
    const match = text.match(/[\d,.]+/); 
    return match ? parseFloat(match[0].replace(',', '')) : 0;
  };
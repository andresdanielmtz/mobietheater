/**
 * 
 * @param date 
 * @returns 
 */

export const formatDate = (date: Date | null): string => {
    if (!date) return '';
  
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${month}/${day}/${year} ${hours}:${minutes}`;
  };
  
  
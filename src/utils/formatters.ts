export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDuration(minutes: number): string {
  if (!minutes || minutes <= 0) return '0 min';
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 0 && remainingMinutes > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }
  if (hours > 0) {
    return `${hours}h`;
  }
  return `${remainingMinutes} min`;
}

export function formatPlate(raw: string): string {
  return raw.toUpperCase().replace(/\s+/g, '').trim();
}

/**
 * Downloads a structured CSV file that opens seamlessly in Microsoft Excel
 */
export function exportToCSV(filename: string, rows: (string | number)[][]): void {
  const processRow = (row: (string | number)[]) => {
    return row.map(value => {
      let stringValue = value === null || value === undefined ? '' : String(value);
      if (stringValue.includes('"') || stringValue.includes(',') || stringValue.includes(';') || stringValue.includes('\n')) {
        stringValue = `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    }).join(';');
  };

  const csvContent = '\uFEFF' + rows.map(processRow).join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

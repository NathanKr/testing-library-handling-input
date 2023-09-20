
export function parseCSV(csvData: string): number[] {
    const lines = csvData.split('\n');
    const grades: number[] = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.length > 0) {
            const parts = line.split(',');
            const grade = parseFloat(parts[1]);
            if (!isNaN(grade)) {
                grades.push(grade);
            }
        }
    }

    return grades;
}
import React, { useState } from 'react';
import './Spreadsheet.css';

const Spreadsheet = () => {
    const [data, setData] = useState(Array(10).fill().map(() => Array(10).fill('')));

    const handleChange = (row, col, value) => {
        const newData = data.map((r, rowIndex) => 
            rowIndex === row ? r.map((c, colIndex) => colIndex === col ? value : c) : r
        );
        setData(newData);
    };

    const evaluateFormula = (formula) => {
        try {
            if (formula.startsWith('=')) {
                return eval(formula.substring(1));
            }
            return formula;
        } catch {
            return 'ERROR';
        }
    };

    return (
        <table className="spreadsheet">
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <td key={colIndex}>
                                <input
                                    type="text"
                                    value={cell}
                                    onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                                    onBlur={() => handleChange(rowIndex, colIndex, evaluateFormula(cell))}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Spreadsheet;

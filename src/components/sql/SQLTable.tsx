import React from 'react';

interface SQLTableProps {
    name: string;
    columns: string[];
    rows: any[][];
}

export function SQLTable({ name, columns, rows }: SQLTableProps) {
    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-batman-yellow uppercase tracking-widest flex items-center">
                    <span className="w-2 h-4 bg-batman-yellow mr-2 rounded-full"></span>
                    Table: {name}
                </h4>
                <span className="text-[10px] text-batman-yellow/50 uppercase tracking-tighter">
                    Dataset Preview
                </span>
            </div>
            <div className="overflow-x-auto rounded-xl border border-batman-yellow/20 shadow-2xl bg-batman-dark/50 backdrop-blur-sm">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-batman-gray/80 border-b border-batman-yellow/30">
                            {columns.map((col, idx) => (
                                <th
                                    key={idx}
                                    className="px-4 py-3 text-left text-xs font-bold text-batman-yellow uppercase tracking-tighter"
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, rowIdx) => (
                            <tr
                                key={rowIdx}
                                className="border-b border-batman-yellow/10 hover:bg-batman-yellow/5 transition-colors group"
                            >
                                {row.map((cell, cellIdx) => (
                                    <td
                                        key={cellIdx}
                                        className="px-4 py-3 text-sm text-gray-300 font-mono group-hover:text-batman-yellow transition-colors"
                                    >
                                        {cell === null ? (
                                            <span className="text-batman-yellow/30 italic">NULL</span>
                                        ) : (
                                            String(cell)
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

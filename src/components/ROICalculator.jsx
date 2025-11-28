import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ROICalculator = () => {
    const [employees, setEmployees] = useState(3);
    const [clientsPerEmployee, setClientsPerEmployee] = useState(100);
    const feePerClient = 1800;
    const salaryPerEmployee = 45000;
    const costRatio = 0.2;

    // Calculations
    const calculateProfit = (clientCount) => {
        const revenue = employees * clientCount * feePerClient;
        const fixedCost = employees * salaryPerEmployee;
        const variableCost = revenue * costRatio;
        return Math.round(revenue - fixedCost - variableCost);
    };

    const currentProfit = calculateProfit(clientsPerEmployee);
    const traditionalProfit = calculateProfit(50); // Traditional: 50 clients/employee
    const profitIncrease = currentProfit - traditionalProfit;

    // Chart Data Generation
    const chartData = useMemo(() => {
        const data = [];
        for (let i = 30; i <= 150; i += 10) {
            data.push({
                clients: i,
                traditional: calculateProfit(50), // Constant baseline
                smart: calculateProfit(i),
            });
        }
        return data;
    }, [employees]);

    return (
        <div className="roi-calculator-container" style={{ background: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#0f172a' }}>算給老闆看：真實的 ROI 效益</h2>
            <p style={{ textAlign: 'center', marginBottom: '40px', color: '#64748b' }}>拖動滑桿，預測您的利潤成長曲線</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
                {/* Controls & Stats */}
                <div>
                    {/* Sliders */}
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#334155' }}>
                            事務所員工數: <span style={{ color: '#d4af37', fontSize: '1.2rem' }}>{employees} 人</span>
                        </label>
                        <input
                            type="range" min="1" max="20" value={employees}
                            onChange={(e) => setEmployees(Number(e.target.value))}
                            style={{ width: '100%', accentColor: '#d4af37' }}
                        />
                    </div>
                    <div style={{ marginBottom: '40px' }}>
                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: '#334155' }}>
                            人均服務客戶數: <span style={{ color: '#d4af37', fontSize: '1.2rem' }}>{clientsPerEmployee} 家</span>
                        </label>
                        <input
                            type="range" min="30" max="150" step="5" value={clientsPerEmployee}
                            onChange={(e) => setClientsPerEmployee(Number(e.target.value))}
                            style={{ width: '100%', accentColor: '#d4af37' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8', marginTop: '5px' }}>
                            <span>30家 (輕鬆)</span>
                            <span>50家 (傳統極限)</span>
                            <span>100家 (智能標準)</span>
                            <span>150家 (極限)</span>
                        </div>
                    </div>

                    {/* Big Numbers */}
                    <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
                        <div style={{ marginBottom: '15px' }}>
                            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>預估每月淨利潤</div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#10b981' }}>
                                NT$ {currentProfit.toLocaleString()}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>比傳統模式多賺</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0f172a' }}>
                                    + {profitIncrease.toLocaleString()} /月
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>年營收增加</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#d4af37' }}>
                                    + {(profitIncrease * 12).toLocaleString()} /年
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart */}
                <div style={{ height: '350px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="clients" label={{ value: '人均客戶數', position: 'insideBottom', offset: -5 }} />
                            <YAxis tickFormatter={(value) => `${value / 10000}萬`} />
                            <Tooltip formatter={(value) => `NT$ ${value.toLocaleString()}`} />
                            <Legend verticalAlign="top" height={36} />
                            <Line type="monotone" dataKey="traditional" name="傳統模式 (50家基準)" stroke="#94a3b8" strokeDasharray="5 5" dot={false} />
                            <Line type="monotone" dataKey="smart" name="SmartTAXer 智能模式" stroke="#d4af37" strokeWidth={3} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8', marginTop: '10px' }}>
                        *X軸：人均服務客戶數成長 | Y軸：每月淨利潤
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ROICalculator;

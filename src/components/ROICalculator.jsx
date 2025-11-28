import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ReferenceLine, BarChart, Bar, Cell, LabelList } from 'recharts';

const ROICalculator = () => {
    const [employees, setEmployees] = useState(3);
    const [clientsPerEmployee, setClientsPerEmployee] = useState(100);
    const feePerClient = 1800;
    const salaryPerEmployee = 45000;
    const costRatio = 0.2;

    // Calculations
    const calculateData = (clientsPerEmp) => {
        const totalClients = employees * clientsPerEmp;
        const revenue = totalClients * feePerClient;

        // Smart Mode Cost: Fixed employees (efficiency increased)
        const smartFixedCost = employees * salaryPerEmployee;
        const smartVariableCost = revenue * costRatio;
        const smartProfit = Math.round(revenue - smartFixedCost - smartVariableCost);

        // Traditional Mode Cost with Idle Cost Penalty
        // If clients per employee < 30, add idle cost
        let idleCostFactor = 1;
        if (clientsPerEmp < 30) {
            idleCostFactor = 1 + ((30 - clientsPerEmp) / 30) * 0.5; // Up to 50% cost increase
        }

        const requiredEmployees = employees * (clientsPerEmp / 50);
        const traditionalFixedCost = requiredEmployees * salaryPerEmployee * idleCostFactor;
        const traditionalVariableCost = revenue * costRatio;
        const traditionalProfit = Math.round(revenue - traditionalFixedCost - traditionalVariableCost);

        return { smartProfit, traditionalProfit };
    };

    const currentStats = calculateData(clientsPerEmployee);
    const profitIncrease = currentStats.smartProfit - currentStats.traditionalProfit;

    // Chart Data Generation
    const chartData = useMemo(() => {
        const data = [];
        for (let i = 10; i <= 150; i += 5) {
            const { smartProfit, traditionalProfit } = calculateData(i);
            data.push({
                clients: i,
                traditional: traditionalProfit,
                smart: smartProfit,
            });
        }
        return data;
    }, [employees]);

    // Calculate gradient offset for profit/loss colors
    const gradientOffset = () => {
        const dataMax = Math.max(...chartData.map((i) => Math.max(i.smart, i.traditional)));
        const dataMin = Math.min(...chartData.map((i) => Math.min(i.smart, i.traditional)));
        if (dataMax <= 0) return 0;
        if (dataMin >= 0) return 1;
        return dataMax / (dataMax - dataMin);
    };
    const off = gradientOffset();

    // Work hours comparison data
    const workHoursData = [
        { name: '傳統模式', hours: Math.round((employees * clientsPerEmployee) * 4) },
        { name: '智能模式', hours: Math.round((employees * clientsPerEmployee) * 0.5) },
    ];

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
                            目標人均服務客戶數: <span style={{ color: '#d4af37', fontSize: '1.2rem' }}>{clientsPerEmployee} 家</span>
                        </label>
                        <input
                            type="range" min="10" max="150" step="10" value={clientsPerEmployee}
                            onChange={(e) => setClientsPerEmployee(Number(e.target.value))}
                            style={{ width: '100%', accentColor: '#d4af37' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8', marginTop: '5px' }}>
                            <span>30家</span>
                            <span>50家 (傳統極限)</span>
                            <span>100家</span>
                            <span>150家</span>
                        </div>
                        <div style={{ marginTop: '15px', fontSize: '0.9rem', color: '#94a3b8', textAlign: 'right' }}>
                            *設定參數：每戶公費 $1,800/月
                        </div>
                        <div style={{ marginTop: '10px', padding: '10px', background: '#eff6ff', borderRadius: '8px', textAlign: 'center' }}>
                            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>總服務客戶數：</span>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0f172a' }}>{employees * clientsPerEmployee} 家</span>
                        </div>
                    </div>

                    {/* Big Numbers */}
                    <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
                        <div style={{ marginBottom: '15px' }}>
                            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>預估每月淨利潤 (智能模式)</div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#10b981' }}>
                                NT$ {currentStats.smartProfit.toLocaleString()}
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
                        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset={off} stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset={off} stopColor="#ef4444" stopOpacity={0.3} />
                                </linearGradient>
                                <linearGradient id="colorSmart" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="clients" label={{ value: '人均客戶數', position: 'insideBottom', offset: -5 }} />
                            <YAxis
                                tickFormatter={(value) => `${value / 10000}萬`}
                                label={{ value: '每月淨利潤 (NT$)', position: 'top', offset: 20 }}
                            />
                            <Tooltip formatter={(value) => `NT$ ${value.toLocaleString()}`} />
                            <Legend verticalAlign="top" height={36} />
                            <ReferenceLine y={0} stroke="#000" strokeWidth={2} label={{ value: '零利潤', position: 'right' }} />
                            <Area type="monotone" dataKey="traditional" name="傳統模式 (需增加人力)" stroke="#94a3b8" fill="url(#splitColor)" strokeWidth={2} />
                            <Area type="monotone" dataKey="smart" name="SmartTAXer 智能模式" stroke="#d4af37" fill="url(#colorSmart)" strokeWidth={3} />
                        </AreaChart>
                    </ResponsiveContainer>
                    <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8', marginTop: '10px' }}>
                        *傳統模式假設人均上限 50 家，超過需等比例增加人力成本
                    </p>

                    {/* Work Hours Comparison Chart */}
                    <div style={{ marginTop: '40px' }}>
                        <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#0f172a', fontSize: '1.1rem' }}>總工時對比 (小時/月)</h3>
                        <div style={{ height: '200px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    layout="vertical"
                                    data={workHoursData}
                                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                                >
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} tick={{ fontSize: '1rem', fontWeight: 'bold' }} />
                                    <Tooltip />
                                    <Bar dataKey="hours" radius={[0, 10, 10, 0]} barSize={50}>
                                        {workHoursData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#94a3b8' : '#10b981'} />
                                        ))}
                                        <LabelList dataKey="hours" position="right" style={{ fill: '#64748b', fontWeight: 'bold' }} formatter={(value) => `${value.toLocaleString()} hrs`} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginTop: '10px' }}>節省工時：<span style={{ color: '#10b981', fontWeight: 'bold' }}>{((1 - workHoursData[1].hours / workHoursData[0].hours) * 100).toFixed(0)}%</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ROICalculator;

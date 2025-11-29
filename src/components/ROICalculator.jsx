import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList, Tooltip } from 'recharts';

const ROICalculator = () => {
    const [employees, setEmployees] = useState(3);
    const [clientsPerEmployee, setClientsPerEmployee] = useState(80);

    // Parameters
    const feePerClient = 1800;
    const salaryPerEmployee = 45000;
    const fixedCost = 80000;
    const variableCostRatio = 0.2;

    // Calculate based on current inputs
    const totalClients = employees * clientsPerEmployee;
    const revenue = totalClients * feePerClient;

    // Smart Mode
    const smartFixedCost = employees * salaryPerEmployee + fixedCost;
    const smartVariableCost = revenue * variableCostRatio;
    const smartProfit = revenue - smartFixedCost - smartVariableCost;
    const smartHours = totalClients * 0.5;

    // Traditional Mode with idle cost penalty
    let idleCostFactor = 1;
    if (clientsPerEmployee < 30) {
        idleCostFactor = 1 + ((30 - clientsPerEmployee) / 30) * 0.5;
    }
    const requiredEmployees = employees * (clientsPerEmployee / 50);
    const traditionalFixedCost = (requiredEmployees * salaryPerEmployee + fixedCost) * idleCostFactor;
    const traditionalVariableCost = revenue * variableCostRatio;
    const traditionalProfit = revenue - traditionalFixedCost - traditionalVariableCost;
    const traditionalHours = totalClients * 3.2;

    // Work hours comparison data
    const workHoursData = [
        { name: '傳統模式', hours: Math.round(traditionalHours), fill: '#1e40af' },
        { name: '智能模式', hours: Math.round(smartHours), fill: '#d4af37' },
    ];

    const profitDiff = smartProfit - traditionalProfit;
    const hoursSaved = traditionalHours - smartHours;

    return (
        <div style={{ background: '#fff', padding: '60px 40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '10px', color: '#0f172a', fontSize: '2rem' }}>算給老闆看：真實的 ROI 效益</h2>
            <p style={{ textAlign: 'center', marginBottom: '60px', color: '#64748b' }}>拖動滑桿，即時計算您的利潤成長</p>

            {/* Sliders */}
            <div style={{ maxWidth: '600px', margin: '0 auto 60px' }}>
                <div style={{ marginBottom: '40px' }}>
                    <label style={{ display: 'block', marginBottom: '15px', fontWeight: 'bold', color: '#334155', fontSize: '1.1rem' }}>
                        事務所員工數: <span style={{ color: '#d4af37', fontSize: '1.5rem' }}>{employees} 人</span>
                    </label>
                    <input
                        type="range" min="1" max="20" step="1" value={employees}
                        onChange={(e) => setEmployees(Number(e.target.value))}
                        style={{ width: '100%', height: '8px', accentColor: '#d4af37' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#94a3b8', marginTop: '5px' }}>
                        <span>1人</span>
                        <span>20人</span>
                    </div>
                </div>
                <div style={{ marginBottom: '40px' }}>
                    <label style={{ display: 'block', marginBottom: '15px', fontWeight: 'bold', color: '#334155', fontSize: '1.1rem' }}>
                        目標人均服務客戶數: <span style={{ color: '#d4af37', fontSize: '1.5rem' }}>{clientsPerEmployee} 家</span>
                    </label>
                    <input
                        type="range" min="10" max="150" step="10" value={clientsPerEmployee}
                        onChange={(e) => setClientsPerEmployee(Number(e.target.value))}
                        style={{ width: '100%', height: '8px', accentColor: '#d4af37' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#94a3b8', marginTop: '5px' }}>
                        <span>10家</span>
                        <span>50家 (傳統極限)</span>
                        <span>150家</span>
                    </div>
                </div>
                <div style={{ padding: '15px', background: '#eff6ff', borderRadius: '12px', textAlign: 'center' }}>
                    <span style={{ fontSize: '1rem', color: '#64748b' }}>總服務客戶數：</span>
                    <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0f172a', marginLeft: '10px' }}>{totalClients} 家</span>
                </div>
            </div>

            {/* Comparison Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '60px' }}>
                {/* Traditional Mode Card */}
                <div style={{ background: '#eff6ff', padding: '30px', borderRadius: '15px', border: '3px solid #1e40af' }}>
                    <h3 style={{ color: '#1e40af', marginBottom: '25px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <i className="fa-solid fa-user-clock"></i> 傳統模式
                    </h3>
                    <div style={{ marginBottom: '15px' }}>
                        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>每月總收入</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>NT$ {revenue.toLocaleString()}</div>
                    </div>
                    <div style={{ borderTop: '1px solid #bfdbfe', paddingTop: '15px', marginBottom: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ color: '#64748b' }}>固定成本</span>
                            <span style={{ color: '#dc2626', fontWeight: 'bold' }}>- {Math.round(traditionalFixedCost).toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ color: '#64748b' }}>變動成本 (20%)</span>
                            <span style={{ color: '#dc2626', fontWeight: 'bold' }}>- {Math.round(traditionalVariableCost).toLocaleString()}</span>
                        </div>
                    </div>
                    <div style={{ borderTop: '2px solid #1e40af', paddingTop: '15px' }}>
                        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>每月淨利潤</div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: traditionalProfit >= 0 ? '#d4af37' : '#dc2626' }}>
                            NT$ {Math.round(traditionalProfit).toLocaleString()}
                        </div>
                    </div>
                    {clientsPerEmployee < 30 && (
                        <div style={{ marginTop: '15px', padding: '10px', background: '#dbeafe', borderRadius: '8px', fontSize: '0.85rem', color: '#1e3a8a' }}>
                            <i className="fa-solid fa-triangle-exclamation"></i> 人力閒置，成本增加 {((idleCostFactor - 1) * 100).toFixed(0)}%
                        </div>
                    )}
                </div>

                {/* Smart Mode Card */}
                <div style={{ background: '#fefce8', padding: '30px', borderRadius: '15px', border: '3px solid #d4af37' }}>
                    <h3 style={{ color: '#d4af37', marginBottom: '25px', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <i className="fa-solid fa-robot"></i> SmartTAXer 智能模式
                    </h3>
                    <div style={{ marginBottom: '15px' }}>
                        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>每月總收入</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>NT$ {revenue.toLocaleString()}</div>
                    </div>
                    <div style={{ borderTop: '1px solid #fef08a', paddingTop: '15px', marginBottom: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ color: '#64748b' }}>固定成本</span>
                            <span style={{ color: '#dc2626', fontWeight: 'bold' }}>- {Math.round(smartFixedCost).toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span style={{ color: '#64748b' }}>變動成本 (20%)</span>
                            <span style={{ color: '#dc2626', fontWeight: 'bold' }}>- {Math.round(smartVariableCost).toLocaleString()}</span>
                        </div>
                    </div>
                    <div style={{ borderTop: '2px solid #d4af37', paddingTop: '15px' }}>
                        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>每月淨利潤</div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', color: '#d4af37' }}>
                            NT$ {Math.round(smartProfit).toLocaleString()}
                        </div>
                    </div>
                    <div style={{ marginTop: '15px', padding: '10px', background: '#fef9c3', borderRadius: '8px', fontSize: '0.85rem', color: '#713f12' }}>
                        <i className="fa-solid fa-check-circle"></i> 固定人力，效率倍增
                    </div>
                </div>
            </div>

            {/* Profit Comparison */}
            <div style={{ background: 'linear-gradient(135deg, #1e40af 0%, #d4af37 100%)', padding: '40px', borderRadius: '15px', textAlign: 'center', marginBottom: '60px', color: '#fff' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', opacity: 0.9 }}>導入 SmartTAXer 後</h3>
                <div style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '10px' }}>
                    {profitDiff >= 0 ? '+' : ''} NT$ {Math.round(profitDiff).toLocaleString()}
                </div>
                <div style={{ fontSize: '1.2rem', opacity: 0.9 }}>每月多賺 / 年增 NT$ {Math.round(profitDiff * 12).toLocaleString()}</div>
            </div>

            {/* Work Hours Comparison */}
            <div style={{ background: '#f8fafc', padding: '40px', borderRadius: '15px' }}>
                <h3 style={{ textAlign: 'center', marginBottom: '30px', color: '#0f172a', fontSize: '1.5rem' }}>
                    <i className="fa-solid fa-clock"></i> 總工時對比（小時/月）
                </h3>
                <div style={{ height: '200px', marginBottom: '20px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            layout="vertical"
                            data={workHoursData}
                            margin={{ top: 5, right: 100, left: 100, bottom: 5 }}
                        >
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: '1.1rem', fontWeight: 'bold' }} />
                            <Tooltip />
                            <Bar dataKey="hours" radius={[0, 10, 10, 0]} barSize={60}>
                                {workHoursData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                                <LabelList dataKey="hours" position="right" style={{ fill: '#334155', fontWeight: 'bold', fontSize: '1.2rem' }} formatter={(value) => `${value.toLocaleString()} hrs`} />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ textAlign: 'center', fontSize: '1.1rem' }}>
                    <span style={{ color: '#64748b' }}>節省工時：</span>
                    <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '1.5rem', marginLeft: '10px' }}>
                        {Math.round(hoursSaved).toLocaleString()} hrs ({((hoursSaved / traditionalHours) * 100).toFixed(0)}%)
                    </span>
                </div>
                <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#94a3b8', marginTop: '20px' }}>
                    *傳統模式：每戶 3.2 小時 | 智能模式：每戶 0.5 小時（AI 輔助）
                </p>
            </div>

            {/* Formula Explanation */}
            <div style={{ marginTop: '60px', padding: '30px', background: '#f8fafc', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ color: '#0f172a', marginBottom: '20px', fontSize: '1.3rem' }}>
                    <i className="fa-solid fa-calculator"></i> 計算公式說明
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    <div>
                        <h4 style={{ color: '#10b981', marginBottom: '15px' }}>SmartTAXer 智能模式</h4>
                        <div style={{ fontSize: '0.9rem', lineHeight: '1.8', color: '#334155' }}>
                            <div><strong>總收入</strong> = 總客戶數 × $1,800</div>
                            <div><strong>固定成本</strong> = (員工數 × $45,000) + $80,000</div>
                            <div style={{ marginLeft: '20px', fontSize: '0.85rem', color: '#64748b' }}>含所長薪資、房租、水電、雜支</div>
                            <div><strong>變動成本</strong> = 總收入 × 20%</div>
                            <div><strong>淨利潤</strong> = 總收入 - 固定成本 - 變動成本</div>
                            <div style={{ marginTop: '10px' }}><strong>作業工時</strong> = 總客戶數 × 0.5 hrs</div>
                        </div>
                    </div>
                    <div>
                        <h4 style={{ color: '#ef4444', marginBottom: '15px' }}>傳統模式</h4>
                        <div style={{ fontSize: '0.9rem', lineHeight: '1.8', color: '#334155' }}>
                            <div><strong>總收入</strong> = 總客戶數 × $1,800</div>
                            <div><strong>需求員工數</strong> = 員工數 × (人均客戶數 ÷ 50)</div>
                            <div style={{ marginLeft: '20px', fontSize: '0.85rem', color: '#64748b' }}>傳統模式上限 50 家/人</div>
                            <div><strong>固定成本</strong> = (需求員工數 × $45,000 + $80,000) × 閒置係數</div>
                            <div style={{ marginLeft: '20px', fontSize: '0.85rem', color: '#64748b' }}>閒置係數：人均客戶數 &lt; 30 時，成本增加最高 50%</div>
                            <div><strong>變動成本</strong> = 總收入 × 20%</div>
                            <div><strong>淨利潤</strong> = 總收入 - 固定成本 - 變動成本</div>
                            <div style={{ marginTop: '10px' }}><strong>作業工時</strong> = 總客戶數 × 3.2 hrs</div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '25px', padding: '15px', background: '#fffbeb', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
                    <div style={{ fontSize: '0.9rem', color: '#92400e', fontWeight: 'bold', marginBottom: '8px' }}>
                        <i className="fa-solid fa-lightbulb"></i> 預設模擬參數
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#78350f', lineHeight: '1.6' }}>
                        每戶服務費：$1,800/月 | 員工月薪：$45,000 | 固定成本：$80,000/月 | 變動成本率：20%
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ROICalculator;

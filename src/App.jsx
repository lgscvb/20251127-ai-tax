import React from 'react';
import ROICalculator from './components/ROICalculator';
import './index.css';

function App() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <div style={{ marginBottom: '20px' }}>
              <span
                style={{
                  background: '#fff',
                  color: 'var(--accent)',
                  padding: '8px 16px',
                  borderRadius: '30px',
                  border: '1px solid var(--border-light)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                }}>
                <i className="fa-solid fa-robot"></i> 專為會計事務所打造的智能中樞
              </span>
            </div>
            <h1>您的同仁是<span className="text-accent">專業顧問</span>，<br />不該是<span className="text-primary">行政保母</span>。</h1>
            <p>會計師與記帳士是高價值的專業人士。<br />別讓他們的時間浪費在「催件、輸入、對帳」等低產值庶務上。<br />SmartTAXer 幫您釋放團隊潛能，專注於更有價值的稅務規劃。</p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="#roi" className="btn">查看 ROI 效益分析</a>
              <a href="#comparison" className="btn btn-outline">了解新舊流程差異</a>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Professional Accountant" />
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="section-padding comparison-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="text-primary">流程大對決：低階庶務 vs 高階專業</h2>
            <p>為什麼有些事務所可以一人顧 100 家，而您一人顧 50 家就快崩潰？</p>
          </div>

          <div className="timeline-container">
            <div className="timeline-header">
              <h3 className="text-danger">傳統人工流程 (Old)</h3>
              <h3 className="text-success">SmartTAXer 智能流程 (New)</h3>
            </div>

            {/* Step 1: Collection */}
            <div className="timeline-row">
              <div className="vs-badge">VS</div>
              <div className="timeline-card old">
                <h4><i className="fa-solid fa-phone-slash text-danger"></i> 催件地獄</h4>
                <p>月底人工打電話、傳 LINE 催客戶。客戶說「忘了」或「5號再給」。5號沒收到，繼續人工催。收到後發現缺件，再催。</p>
              </div>
              <div className="timeline-card new">
                <h4><i className="fa-solid fa-robot text-success"></i> 自動化協作</h4>
                <p>系統自動發送通知，客戶點選「預約取件」。時間到，<strong>物流自動派單</strong>去收。客戶沒動作？系統自動追殺，不用您開口。</p>
              </div>
            </div>

            {/* Step 2: Processing */}
            <div className="timeline-row">
              <div className="vs-badge">VS</div>
              <div className="timeline-card old">
                <h4><i className="fa-solid fa-file-excel text-danger"></i> 人工分類惡夢</h4>
                <p>收到憑證 -&gt; 人工清洗 -&gt; 剃除不合規 -&gt; <strong>人工分類 (最花時間)</strong> -&gt; 掃描 -&gt; 人工切傳票 -&gt; 財務帳確認。</p>
              </div>
              <div className="timeline-card new">
                <h4><i className="fa-solid fa-microchip text-success"></i> AI 智能辨識</h4>
                <p>全部丟進掃描機 -&gt; <strong>AI 自動依 12 種邏輯分類</strong> -&gt; 自動產生分錄與日記帳。員工只需花 <strong>3 分鐘</strong> 審核異常項目。
                </p>
              </div>
            </div>

            {/* Step 3: Closing */}
            <div className="timeline-row">
              <div className="vs-badge">VS</div>
              <div className="timeline-card old">
                <h4><i className="fa-solid fa-money-bill-wave text-danger"></i> 收款與對帳</h4>
                <p>人工催繳稅金 -&gt; 人工催公費 (尷尬) -&gt; 銀行存摺幾百筆同金額入帳 -&gt; <strong>人工一筆筆勾稽 (眼花)</strong>。</p>
              </div>
              <div className="timeline-card new">
                <h4><i className="fa-solid fa-check-double text-success"></i> 金流全自動</h4>
                <p>自動發送稅單與公費通知 (含虛擬帳號) -&gt; 客戶繳款 -&gt; <strong>系統自動沖帳</strong>。逾期未繳？系統自動發送存證信函。</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Deep Dive: 12 Scenarios */}
      <section className="section-padding deep-dive-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 className="text-primary">我們懂會計：12 種核心判定邏輯</h2>
            <p>這不是普通的 OCR，這是內建會計大腦的 AI。</p>
          </div>

          <div className="matrix-grid">
            {/* Output */}
            <div className="matrix-card">
              <h4><i className="fa-solid fa-arrow-up-from-bracket"></i> 銷項端 (Output)</h4>
              <div style={{ marginTop: '15px' }}>
                <span className="scenario-tag">三聯-應稅/零稅 (公司戶)</span>
                <span className="scenario-tag">二聯-應稅 (個人戶)</span>
                <span className="scenario-tag">作廢 (號碼保留 金額0)</span>
                <span className="scenario-tag">折讓 (關聯原發票)</span>
              </div>
              <p style={{ fontSize: '0.9rem', marginTop: '15px' }}>系統自動判斷格式代號 (31, 35, 21...) 與稅別，自動處理作廢與折讓關聯。</p>
            </div>

            {/* Input Tax */}
            <div className="matrix-card">
              <h4><i className="fa-solid fa-arrow-down-to-bracket"></i> 進項端 - 稅務申報</h4>
              <div style={{ marginTop: '15px' }}>
                <span className="scenario-tag">進項-可扣抵 (21, 25)</span>
                <span className="scenario-tag">進項-不可扣抵 (交際/自用車)</span>
                <span className="scenario-tag">進項-海關 (28)</span>
                <span className="scenario-tag">進項-折讓 (23, 29)</span>
              </div>
              <p style={{ fontSize: '0.9rem', marginTop: '15px' }}>AI 自動識別不可扣抵項目 (如交際費)，避免申報錯誤風險。</p>
            </div>

            {/* Input Finance & Exception */}
            <div className="matrix-card">
              <h4><i className="fa-solid fa-book"></i> 純財務帳 & 例外處理</h4>
              <div style={{ marginTop: '15px' }}>
                <span className="scenario-tag">國外 Invoice (只入帳)</span>
                <span className="scenario-tag">小規模收據</span>
                <span className="scenario-tag">勞務/薪資單</span>
                <span className="scenario-tag" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>混合稅別
                  (需拆分)</span>
              </div>
              <p style={{ fontSize: '0.9rem', marginTop: '15px' }}>連最麻煩的「混合稅別」(如家樂福發票) 都能自動拆分應稅與免稅金額。</p>
            </div>
          </div>

          {/* Death Spiral Section (Moved out of grid) */}
          <div style={{ marginTop: '80px', textAlign: 'center' }}>
            <h2 className="text-primary" style={{ marginBottom: '40px' }}>打破事務所的「死亡螺旋」</h2>
            <p style={{ marginBottom: '60px' }}>為什麼人訓練好了就跑？因為忙季壓力太大。<br />SmartTAXer 讓您的員工<strong>產能倍增</strong>，但<strong>工作壓力只剩 1/3</strong>。</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'stretch' }}>
              {/* The Death Spiral */}
              <div
                style={{
                  background: '#fff',
                  padding: '40px',
                  borderRadius: '20px',
                  borderTop: '5px solid #ef4444',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                <h3 className="text-danger" style={{ fontSize: '1.8rem', marginBottom: '20px' }}>
                  <i className="fa-solid fa-skull-crossbones"></i> 傳統模式：死亡螺旋
                </h3>
                <div style={{ height: '250px', overflow: 'hidden', borderRadius: '10px', marginBottom: '30px' }}>
                  <img src="images/old_workflow.png" alt="Chaotic Office"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ fontSize: '1.1rem', color: '#64748b', textAlign: 'left', paddingLeft: '20px' }}>
                  <p style={{ marginBottom: '15px' }}><i className="fa-solid fa-circle-xmark text-danger" style={{ marginRight: '10px' }}></i> 忙季加班地獄 (壓力大)</p>
                  <p style={{ marginBottom: '15px' }}><i className="fa-solid fa-circle-xmark text-danger" style={{ marginRight: '10px' }}></i> 員工身心俱疲 (想離職)</p>
                  <p style={{ marginBottom: '15px' }}><i className="fa-solid fa-circle-xmark text-danger" style={{ marginRight: '10px' }}></i> 熟手離職 -&gt; 新人訓練成本高</p>
                  <p style={{ fontWeight: 'bold', color: '#ef4444' }}><i className="fa-solid fa-arrow-trend-down" style={{ marginRight: '10px' }}></i> 老闆陷入無限補人迴圈</p>
                </div>
              </div>

              {/* The Virtuous Cycle */}
              <div
                style={{
                  background: '#fff',
                  padding: '40px',
                  borderRadius: '20px',
                  borderTop: '5px solid #10b981',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                <h3 className="text-success" style={{ fontSize: '1.8rem', marginBottom: '20px' }}>
                  <i className="fa-solid fa-seedling"></i> 智能模式：正向循環
                </h3>
                <div style={{ height: '250px', overflow: 'hidden', borderRadius: '10px', marginBottom: '30px' }}>
                  <img src="images/new_workflow.png" alt="Zen Office"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ fontSize: '1.1rem', color: '#64748b', textAlign: 'left', paddingLeft: '20px' }}>
                  <p style={{ marginBottom: '15px' }}><i className="fa-solid fa-circle-check text-success" style={{ marginRight: '10px' }}></i> <strong>忙季準時下班</strong> (壓力 1/3)</p>
                  <p style={{ marginBottom: '15px' }}><i className="fa-solid fa-circle-check text-success" style={{ marginRight: '10px' }}></i> 專注高價值工作 (成就感)</p>
                  <p style={{ marginBottom: '15px' }}><i className="fa-solid fa-circle-check text-success" style={{ marginRight: '10px' }}></i> 員工穩定留任 -&gt; 經驗累積</p>
                  <p style={{ fontWeight: 'bold', color: '#10b981' }}><i className="fa-solid fa-arrow-trend-up" style={{ marginRight: '10px' }}></i> 老闆營收翻倍，管理更輕鬆</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section id="roi" className="section-padding roi-section">
        <div className="container">
          <ROICalculator />
        </div>
      </section>

      {/* Features Section (Zig-Zag) */}
      <section className="section-padding features-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className="text-primary">三大核心解放，把時間還給專業</h2>
            <p>我們不只做帳，我們幫您解決「人」的問題。</p>
          </div>

          {/* Feature 1 */}
          <div className="feature-row">
            <div className="feature-content">
              <span className="text-accent" style={{ fontWeight: 'bold', letterSpacing: '1px' }}>FEATURE 01</span>
              <h3>智能催件與物流協作</h3>
              <p>不用再當保母，AI 幫您準時收齊憑證。</p>
              <ul className="feature-list" style={{ listStyle: 'none' }}>
                <li><i className="fa-solid fa-check"></i> <strong>自動追殺</strong>：LINE/SMS 自動排程提醒，客戶不交件，系統幫您催。</li>
                <li><i className="fa-solid fa-check"></i> <strong>物流串接</strong>：客戶點選「預約收件」，系統自動派單物流去收。</li>
                <li><i className="fa-solid fa-check"></i> <strong>OCR 分件</strong>：憑證一進來，OCR 自動掃描分類，直接進入建檔流程。</li>
              </ul>
            </div>
            <div className="feature-image">
              <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Automated Collection" />
            </div>
          </div>

          {/* Feature 2 (Reverse) */}
          <div className="feature-row reverse">
            <div className="feature-content">
              <span className="text-accent" style={{ fontWeight: 'bold', letterSpacing: '1px' }}>FEATURE 02</span>
              <h3>AI 智能對帳與異常偵測</h3>
              <p>告別「眼花撩亂」的人工對帳，讓 AI 當您的鷹眼。</p>
              <ul className="feature-list" style={{ listStyle: 'none' }}>
                <li><i className="fa-solid fa-check"></i> <strong>銀行串接</strong>：自動匯入銀行明細，AI 自動比對銷帳。</li>
                <li><i className="fa-solid fa-check"></i> <strong>異常警示</strong>：重複發票、統編錯誤、金額異常，系統主動跳紅燈。</li>
                <li><i className="fa-solid fa-check"></i> <strong>自動調節</strong>：自動產生銀行調節表，月底結帳快 5 倍。</li>
              </ul>
            </div>
            <div className="feature-image">
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="AI Reconciliation" />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-row">
            <div className="feature-content">
              <span className="text-accent" style={{ fontWeight: 'bold', letterSpacing: '1px' }}>FEATURE 03</span>
              <h3>智能催繳與金流管理</h3>
              <p>收錢不尷尬，現金流自動入袋。</p>
              <ul className="feature-list" style={{ listStyle: 'none' }}>
                <li><i className="fa-solid fa-check"></i> <strong>自動請款</strong>：系統自動發送當期請款單，時間到就寄出。</li>
                <li><i className="fa-solid fa-check"></i> <strong>虛擬帳號</strong>：整合金流，客戶匯款後系統自動沖帳。</li>
                <li><i className="fa-solid fa-check"></i> <strong>存證信函</strong>：逾期未繳，系統可自動生成存證信函範本。</li>
              </ul>
            </div>
            <div className="feature-image">
              <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Cash Flow Management" />
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="section-padding cta-section">
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>準備好升級您的事務所了嗎？</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '40px' }}>前 50 名預約演示，享首年導入費 5 折優惠。</p>
          <a href="#" className="btn" style={{ padding: '20px 60px', fontSize: '1.5rem' }}>立即預約免費演示</a>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>&copy; 2023 SmartTAXer AI 多元稅務助手. All rights reserved.</p>
          <p>Designed for Modern Accounting Firms.</p>
        </div>
      </footer>
    </>
  );
}

export default App;

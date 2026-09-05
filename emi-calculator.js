// Simple EMI calculator and amortization (client-side)
(function(){
  const form = document.getElementById('emi-form');
  const clearBtn = document.getElementById('clear');
  const emiRes = document.getElementById('emi-result');
  const totalInterest = document.getElementById('total-interest');
  const totalPayment = document.getElementById('total-payment');
  const showAmortBtn = document.getElementById('show-amort');
  const amortDiv = document.getElementById('amortization');
  const amortTableBody = document.querySelector('#amort-table tbody');

  function formatCurrency(v){
    return new Intl.NumberFormat(undefined, {style:'currency',currency:'INR',maximumFractionDigits:2}).format(v);
  }

  function calculate(principal, annualRate, years){
    const P = parseFloat(principal);
    const r = parseFloat(annualRate)/100/12; // monthly rate
    const n = parseFloat(years)*12;
    if (r === 0) {
      return {emi: P/n, totalPayment: P, totalInterest: 0, schedule: []};
    }
    const emi = (P * r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1);
    let balance = P;
    const schedule = [];
    for(let i=1;i<=Math.min(n,240);i++){ // store up to first 240 months
      const interest = balance * r;
      const principalPaid = emi - interest;
      balance = Math.max(0, balance - principalPaid);
      schedule.push({month:i, principal:principalPaid, interest, balance});
    }
    const totalPayment = emi * n;
    return {emi, totalPayment, totalInterest: totalPayment - P, schedule};
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const principal = document.getElementById('principal').value;
    const rate = document.getElementById('rate').value;
    const tenure = document.getElementById('tenure').value;
    if (!principal || !rate || !tenure) return;
    const res = calculate(principal, rate, tenure);
    emiRes.textContent = formatCurrency(res.emi);
    totalInterest.textContent = formatCurrency(res.totalInterest);
    totalPayment.textContent = formatCurrency(res.totalPayment);
    // prepare amort table but hidden until requested
    amortTableBody.innerHTML = '';
    res.schedule.forEach(row=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${row.month}</td><td>${formatCurrency(row.principal)}</td><td>${formatCurrency(row.interest)}</td><td>${formatCurrency(row.balance)}</td>`;
      amortTableBody.appendChild(tr);
    });
    amortDiv.hidden = true;
  });

  clearBtn.addEventListener('click', ()=>{
    form.reset();
    emiRes.textContent = '—';
    totalInterest.textContent = '—';
    totalPayment.textContent = '—';
    amortTableBody.innerHTML = '';
    amortDiv.hidden = true;
  });

  showAmortBtn.addEventListener('click', ()=>{
    amortDiv.hidden = !amortDiv.hidden;
    if (!amortDiv.hidden) showAmortBtn.textContent = 'Hide Amortization';
    else showAmortBtn.textContent = 'Show Amortization';
  });

  // accessibility: keyboard support for show amort button
})();

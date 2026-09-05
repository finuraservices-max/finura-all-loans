// Home loan calculator: computes loan amount from property value and down payment, EMI, amortization
(function(){
  const propertyValue = document.getElementById('propertyValue');
  const downPayment = document.getElementById('downPayment');
  const loanAmount = document.getElementById('loanAmount');
  const homeRate = document.getElementById('homeRate');
  const homeTenure = document.getElementById('homeTenure');
  const propTax = document.getElementById('propTax');
  const insurance = document.getElementById('insurance');

  const btnCalc = document.getElementById('home-calc');
  const btnClear = document.getElementById('home-clear');
  const emiEl = document.getElementById('home-emi');
  const totalMonthlyEl = document.getElementById('home-total-monthly');
  const totalInterestEl = document.getElementById('home-total-interest');
  const totalPaymentEl = document.getElementById('home-total-payment');
  const showAmortBtn = document.getElementById('home-show-amort');
  const amortDiv = document.getElementById('home-amort');
  const amortBody = document.querySelector('#home-amort-table tbody');

  function formatCurrency(v){
    return new Intl.NumberFormat(undefined, {style:'currency',currency:'INR',maximumFractionDigits:2}).format(v);
  }

  function computeLoanAmount(){
    const pv = parseFloat(propertyValue.value)||0;
    const dp = parseFloat(downPayment.value)||0;
    const amt = Math.max(0, pv - dp);
    loanAmount.value = amt.toFixed(2);
    return amt;
  }

  function calculateEMI(P, annualRate, years){
    const r = parseFloat(annualRate)/100/12;
    const n = Math.round(parseFloat(years)*12);
    if (n === 0) return {emi:0, totalPayment:0, totalInterest:0, schedule:[]};
    if (r === 0) {
      const emi = P / n;
      return {emi, totalPayment: P, totalInterest: 0, schedule:[]};
    }
    const emi = (P * r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1);
    let balance = P;
    const schedule = [];
    for(let i=1;i<=Math.min(n,600);i++){
      const interest = balance * r;
      const principalPaid = emi - interest;
      balance = Math.max(0, balance - principalPaid);
      schedule.push({month:i, principal:principalPaid, interest, balance});
    }
    const totalPayment = emi * n;
    return {emi, totalPayment, totalInterest: totalPayment - P, schedule};
  }

  // Update loan amount when property or down payment changes
  [propertyValue, downPayment].forEach(el=>el.addEventListener('input', computeLoanAmount));

  btnCalc.addEventListener('click', ()=>{
    const P = computeLoanAmount();
    const rate = parseFloat(homeRate.value)||0;
    const years = parseFloat(homeTenure.value)||0;
    const tax = parseFloat(propTax.value)||0;
    const ins = parseFloat(insurance.value)||0;

    if (P <= 0 || years <= 0) return alert('Please enter valid property value/down payment and tenure.');

    const res = calculateEMI(P, rate, years);
    emiEl.textContent = formatCurrency(res.emi);
    const monthlyTotal = res.emi + tax + ins;
    totalMonthlyEl.textContent = formatCurrency(monthlyTotal);
    totalInterestEl.textContent = formatCurrency(res.totalInterest);
    totalPaymentEl.textContent = formatCurrency(res.totalPayment);

    // prepare amort table (first 60 months)
    amortBody.innerHTML = '';
    res.schedule.slice(0,60).forEach(row=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${row.month}</td><td>${formatCurrency(row.principal)}</td><td>${formatCurrency(row.interest)}</td><td>${formatCurrency(row.balance)}</td>`;
      amortBody.appendChild(tr);
    });
    amortDiv.hidden = true;
  });

  btnClear.addEventListener('click', ()=>{
    [propertyValue, downPayment, loanAmount, homeRate, homeTenure, propTax, insurance].forEach(el=>el.value = '');
    loanAmount.value = '';
    emiEl.textContent = '—';
    totalMonthlyEl.textContent = '—';
    totalInterestEl.textContent = '—';
    totalPaymentEl.textContent = '—';
    amortBody.innerHTML = '';
    amortDiv.hidden = true;
  });

  showAmortBtn.addEventListener('click', ()=>{
    amortDiv.hidden = !amortDiv.hidden;
    showAmortBtn.textContent = amortDiv.hidden ? 'Show Amortization' : 'Hide Amortization';
  });

  // init loan amount
  computeLoanAmount();
})();

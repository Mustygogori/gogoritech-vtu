"use client";

import { useState } from "react";

// Mock data for GogoriTech VTU Dashboard
const walletData = {
  balance: 25499.50,
  lastTopup: "2026-08-14",
  currency: "NGN",
};

const networks = [
  { id: 1, name: "MTN", code: "MTN", icon: "📞", color: "text-yellow-400" },
  { id: 2, name: "Airtel", code: "AIRTEL", icon: "📶", color: "text-red-400" },
  { id: 3, name: "Glo", code: "GLO", icon: "📡", color: "text-green-400" },
  { id: 4, name: "9mobile", code: "9MOBILE", icon: "📱", color: "text-cyan-400" },
];

const airtimeAmounts = [
  { id: 1, amount: 100, bonus: 0 },
  { id: 2, amount: 200, bonus: 0 },
  { id: 3, amount: 500, bonus: 50 },
  { id: 4, amount: 1000, bonus: 150 },
  { id: 5, amount: 2500, bonus: 500 },
  { id: 6, amount: 5000, bonus: 1000 },
];

const dataPlans = [
  { id: 1, size: "500MB", price: 100, bonus: "0MB", validity: "7 days" },
  { id: 2, size: "1GB", price: 200, bonus: "50MB", validity: "7 days" },
  { id: 3, size: "2GB", price: 500, bonus: "500MB", validity: "30 days" },
  { id: 4, size: "5GB", price: 1000, bonus: "1GB", validity: "30 days" },
  { id: 5, size: "10GB", price: 2000, bonus: "2GB", validity: "30 days" },
];

const electricityProviders = [
  { id: 1, name: "IKEDC", code: "IKEDC", region: "Ikeja, Lagos", color: "text-blue-400" },
  { id: 2, name: "EKEDC", code: "EKEDC", region: "Eko, Lagos", color: "text-purple-400" },
  { id: 3, name: "AEDC", code: "AEDC", region: "Abuja", color: "text-red-400" },
  { id: 4, name: "KEDCO", code: "KEDCO", region: "Kano", color: "text-yellow-400" },
];

const electricityAmounts = [
  { id: 1, amount: 1000, discount: 0 },
  { id: 2, amount: 2000, discount: 0 },
  { id: 3, amount: 5000, discount: 250 },
  { id: 4, amount: 10000, discount: 500 },
  { id: 5, amount: 15000, discount: 1000 },
  { id: 6, amount: 20000, discount: 1500 },
];

const meterTypes = [
  { id: 1, name: "Prepaid", code: "PREPAID" },
  { id: 2, name: "Postpaid", code: "POSTPAID" },
];

const walletTopUpAmounts = [500, 1000, 2000, 5000, 10000];

const paymentMethods = [
  { id: 1, name: "Bank Transfer", code: "BANK_TRANSFER", icon: "🏦" },
  { id: 2, name: "Card", code: "CARD", icon: "💳" },
];

const cableProviders = [
  { id: 1, name: "DStv", code: "DSTV", color: "text-red-400" },
  { id: 2, name: "GOtv", code: "GOTV", color: "text-green-400" },
  { id: 3, name: "Startimes", code: "STARTIMES", color: "text-yellow-400" },
];

const cablePackages = [
  { id: 1, provider: "DSTV", name: "DStv Padi", price: 2500, duration: "1 month" },
  { id: 2, provider: "DSTV", name: "DStv Yanga", price: 5000, duration: "1 month" },
  { id: 3, provider: "DSTV", name: "DStv Confam", price: 9000, duration: "1 month" },
  { id: 4, provider: "GOTV", name: "GOtv Smallie", price: 1300, duration: "1 month" },
  { id: 5, provider: "GOTV", name: "GOtv Plus", price: 2400, duration: "1 month" },
  { id: 6, provider: "GOTV", name: "GOtv Max", price: 4200, duration: "1 month" },
  { id: 7, provider: "STARTIMES", name: "Nova", price: 1200, duration: "1 month" },
  { id: 8, provider: "STARTIMES", name: "Smart", price: 2200, duration: "1 month" },
  { id: 9, provider: "STARTIMES", name: "Classic", price: 4000, duration: "1 month" },
];

const services = [
  { id: 1, name: "Airtime", icon: "📱", color: "bg-emerald-500", amount: "₦2,500", description: "Buy airtime for any network" },
  { id: 2, name: "Data", icon: "📊", color: "bg-cyan-500", amount: "₦1,500", description: "Fast mobile data plans" },
  { id: 3, name: "Electricity", icon: "⚡", color: "bg-yellow-500", amount: "₦5,000", description: "Pay your bills instantly" },
  { id: 4, name: "Cable TV", icon: "📺", color: "bg-purple-500", amount: "₦3,500", description: "Renew subscriptions" },
];

const transactions = [
  { id: 1, type: "Airtime", provider: "MTN", amount: -2500, date: "2026-08-14 14:23", status: "Success" },
  { id: 2, type: "Data", provider: "Airtel", amount: -1500, date: "2026-08-13 10:45", status: "Success" },
  { id: 3, type: "Electricity", provider: "IKEDC", amount: -5000, date: "2026-08-12 16:30", status: "Success" },
  { id: 4, type: "Cable TV", provider: "DStv", amount: -3500, date: "2026-08-11 09:15", status: "Success" },
  { id: 5, type: "Wallet Topup", provider: "Bank Transfer", amount: 50000, date: "2026-08-10 13:42", status: "Success" },
];

const allTransactions = [
  { id: 1, txId: "GVT-20260814-1001", type: "Airtime", provider: "MTN", amount: -2500, date: "2026-08-14 14:23", status: "Success" },
  { id: 2, txId: "GVT-20260813-1002", type: "Data", provider: "Airtel", amount: -1500, date: "2026-08-13 10:45", status: "Success" },
  { id: 3, txId: "GVT-20260812-1003", type: "Electricity", provider: "IKEDC", amount: -5000, date: "2026-08-12 16:30", status: "Success" },
  { id: 4, txId: "GVT-20260811-1004", type: "Cable TV", provider: "DStv", amount: -3500, date: "2026-08-11 09:15", status: "Success" },
  { id: 5, txId: "GVT-20260810-1005", type: "Wallet Topup", provider: "Bank Transfer", amount: 50000, date: "2026-08-10 13:42", status: "Success" },
  { id: 6, txId: "GVT-20260809-1006", type: "Airtime", provider: "Glo", amount: -1200, date: "2026-08-09 08:12", status: "Success" },
  { id: 7, txId: "GVT-20260808-1007", type: "Data", provider: "9mobile", amount: -2000, date: "2026-08-08 17:40", status: "Pending" },
  { id: 8, txId: "GVT-20260807-1008", type: "Electricity", provider: "AEDC", amount: -3000, date: "2026-08-07 11:55", status: "Success" },
  { id: 9, txId: "GVT-20260806-1009", type: "Cable TV", provider: "GOtv", amount: -2400, date: "2026-08-06 19:35", status: "Success" },
  { id: 10, txId: "GVT-20260805-1010", type: "Wallet Topup", provider: "Card", amount: 10000, date: "2026-08-05 09:20", status: "Success" },
  { id: 11, txId: "GVT-20260804-1011", type: "Airtime", provider: "Airtel", amount: -3000, date: "2026-08-04 13:18", status: "Failed" },
  { id: 12, txId: "GVT-20260803-1012", type: "Data", provider: "MTN", amount: -1000, date: "2026-08-03 15:05", status: "Success" },
];

const promotions = [
  { id: 1, title: "50% Bonus on Airtime", description: "Buy ₦500 airtime, get ₦250 bonus", validity: "Valid till Aug 20, 2026" },
  { id: 2, title: "Double Data Offer", description: "Double your data on all plans this week", validity: "Valid till Aug 17, 2026" },
  { id: 3, title: "Save on Electricity", description: "₦200 cashback on every electricity payment", validity: "Valid till Aug 25, 2026" },
];

const profileData = {
  name: "Demo User",
  phone: "+234 80•• •••• 678",
  email: "d*********@gogoritech.com",
  memberId: "GT-2026-000001",
  joinDate: "March 15, 2026",
  accountStatus: "Active",
};

export default function Page() {
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [profileTab, setProfileTab] = useState<"overview" | "security" | "settings" | "logout">("overview");
  const [showAirtimeModal, setShowAirtimeModal] = useState(false);
  const [showDataModal, setShowDataModal] = useState(false);
  const [showElectricityModal, setShowElectricityModal] = useState(false);
  const [showCableTvModal, setShowCableTvModal] = useState(false);
  const [showWalletTopUpModal, setShowWalletTopUpModal] = useState(false);
  const [showTransactionsPage, setShowTransactionsPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [selectedMeterType, setSelectedMeterType] = useState<string | null>(null);
  const [selectedCableProvider, setSelectedCableProvider] = useState<string | null>(null);
  const [selectedCablePackage, setSelectedCablePackage] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [meterNumber, setMeterNumber] = useState("");
  const [smartCardNumber, setSmartCardNumber] = useState("");
  const [walletTopUpAmount, setWalletTopUpAmount] = useState<number | null>(null);
  const [customWalletAmount, setCustomWalletAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [purchaseStatus, setPurchaseStatus] = useState<"form" | "processing" | "success" | "error">("form");
  const [transactionRef, setTransactionRef] = useState("");
  const [purchaseError, setPurchaseError] = useState("");

  const handleBuyAirtime = () => {
    setShowAirtimeModal(true);
    setPhoneNumber("");
    setSelectedNetwork(null);
    setSelectedAmount(null);
    setPurchaseStatus("form");
  };

  const handleBuyData = () => {
    setShowDataModal(true);
    setPhoneNumber("");
    setSelectedNetwork(null);
    setSelectedPlan(null);
    setPurchaseStatus("form");
  };

  const handleBuyElectricity = () => {
    setShowElectricityModal(true);
    setMeterNumber("");
    setSelectedProvider(null);
    setSelectedMeterType(null);
    setSelectedAmount(null);
    setPurchaseStatus("form");
  };

  const handleBuyCableTv = () => {
    setShowCableTvModal(true);
    setSmartCardNumber("");
    setSelectedCableProvider(null);
    setSelectedCablePackage(null);
    setPurchaseStatus("form");
  };

  const handleTopUpWallet = () => {
    setShowWalletTopUpModal(true);
    setWalletTopUpAmount(null);
    setCustomWalletAmount("");
    setSelectedPaymentMethod(null);
    setPurchaseStatus("form");
  };

  const handleConfirmPurchase = async () => {
    if (!selectedNetwork || !phoneNumber || (!selectedAmount && !selectedPlan)) {
      setPurchaseError("Please complete the network, phone number, and amount fields.");
      setPurchaseStatus("error");
      return;
    }

    if (phoneNumber.replace(/\D/g, "").length < 10) {
      setPurchaseError("Please enter a valid phone number before continuing.");
      setPurchaseStatus("error");
      return;
    }

    setPurchaseError("");
    setPurchaseStatus("processing");

    try {
      const response = await fetch("/api/sogo/airtime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          network: selectedNetwork,
          phone: phoneNumber,
          amount: selectedAmount ?? Number(selectedPlan ?? 0),
          currency: "NGN",
          reference: `GVT-AIRTIME-${Date.now()}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "The airtime request could not be completed.");
      }

      const ref = data?.request?.idempotencyKey || `GVT-AIRTIME-${Date.now()}`;
      setTransactionRef(ref);
      setPurchaseStatus("success");
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred.";
      setPurchaseError(message);
      setPurchaseStatus("error");
    }
  };

  const selectedAmountData = selectedAmount !== null ? airtimeAmounts.find((a) => a.amount === selectedAmount) ?? null : null;
  const selectedAmountBonus = selectedAmountData?.bonus ?? 0;
  const selectedNetworkName = selectedNetwork ? networks.find((n) => n.code === selectedNetwork)?.name : "";
  const selectedElectricityDiscount = selectedAmount !== null ? electricityAmounts.find((p) => p.amount === selectedAmount)?.discount ?? 0 : 0;
  const walletTopUpValue = walletTopUpAmount ?? (customWalletAmount ? Number(customWalletAmount) : 0);
  const finalWalletBalance = walletData.balance + walletTopUpValue;
  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.txId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = serviceFilter === "All" || transaction.type === serviceFilter;
    const matchesStatus = statusFilter === "All" || transaction.status === statusFilter;
    return matchesSearch && matchesService && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-slate-950/50 backdrop-blur sm:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300">
                GogoriTech VTU
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-3 self-start rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-200 md:self-auto">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              Welcome {profileData.name.split(" ")[0]}
            </div>
          </div>
        </header>

        {/* Wallet Section */}
        <section className="mb-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/40">
          <h2 className="mb-4 text-2xl font-semibold text-white">Wallet Balance</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
              <p className="text-sm text-slate-400">Current Balance</p>
              <p className="mt-3 text-4xl font-bold text-emerald-400">
                ₦{walletData.balance.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
              </p>
              <p className="mt-2 text-xs text-slate-500">Last top-up: {walletData.lastTopup}</p>
            </div>

            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-6">
              <p className="text-sm text-cyan-300">Quick Action</p>
              <button
                onClick={handleTopUpWallet}
                className="mt-4 w-full rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-white transition hover:bg-cyan-600"
              >
                Top Up Wallet
              </button>
            </div>

            <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-6">
              <p className="text-sm text-violet-300">Referral Bonus</p>
              <p className="mt-3 text-2xl font-bold text-violet-400">₦4,500</p>
              <p className="mt-2 text-xs text-violet-200">5 referrals pending</p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="mb-6">
          <h2 className="mb-4 text-2xl font-semibold text-white">Our Services</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 transition hover:border-slate-700"
              >
                <div className={`inline-flex rounded-lg ${service.color} bg-opacity-20 p-3 text-2xl`}>
                  {service.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{service.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{service.description}</p>
                <button
                  onClick={() => {
                    if (service.id === 1) handleBuyAirtime();
                    if (service.id === 2) handleBuyData();
                    if (service.id === 3) handleBuyElectricity();
                    if (service.id === 4) handleBuyCableTv();
                  }}
                  className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-950 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
          {/* Transactions */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/40">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">Recent Transactions</h2>
              <button
                onClick={() => setShowTransactionsPage(true)}
                className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-sm text-slate-200 transition hover:border-slate-500"
              >
                View All
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-800">
              <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
                <thead className="bg-slate-950/80 text-slate-300">
                  <tr>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Provider</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-slate-800/60">
                      <td className="px-4 py-3 text-slate-100">{transaction.type}</td>
                      <td className="px-4 py-3 text-slate-300">{transaction.provider}</td>
                      <td className={`px-4 py-3 font-medium ${transaction.amount > 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {transaction.amount > 0 ? "+" : ""}₦{Math.abs(transaction.amount).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-slate-300 text-xs">{transaction.date}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Promotions */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/40">
            <h2 className="mb-5 text-2xl font-semibold text-white">Active Promotions</h2>

            <div className="space-y-4">
              {promotions.map((promo) => (
                <div key={promo.id} className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-amber-300">{promo.title}</h3>
                      <p className="mt-1 text-xs text-amber-200/80">{promo.description}</p>
                      <p className="mt-2 text-xs text-amber-200">{promo.validity}</p>
                    </div>
                  </div>
                  <button className="mt-3 w-full rounded-lg bg-amber-500/20 py-1.5 text-xs font-medium text-amber-300 transition hover:bg-amber-500/30">
                    Claim Offer
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Profile Section */}
        <section className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/40">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white">My Profile</h2>
            <button
              onClick={() => setShowProfilePage(true)}
              className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-sm font-medium text-cyan-200 transition hover:border-cyan-400/60 hover:bg-cyan-500/20"
            >
              View Profile
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">Full Name</p>
              <p className="mt-2 text-lg font-semibold text-white">{profileData.name}</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">Phone Number</p>
              <p className="mt-2 text-lg font-semibold text-white">{profileData.phone}</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">Email Address</p>
              <p className="mt-2 text-sm font-semibold text-white">{profileData.email}</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">Member ID</p>
              <p className="mt-2 text-lg font-semibold text-cyan-400">{profileData.memberId}</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-sm text-slate-400">Member Since</p>
              <p className="mt-2 text-lg font-semibold text-white">{profileData.joinDate}</p>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
              <p className="text-sm text-emerald-400">Account Status</p>
              <p className="mt-2 text-lg font-semibold text-emerald-300">{profileData.accountStatus}</p>
            </div>
          </div>
        </section>

        {/* Profile Page */}
        {showProfilePage && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 p-4 backdrop-blur-sm sm:p-6">
            <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/95 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Profile</p>
                  <h2 className="mt-1 text-2xl font-semibold text-white">Account Overview</h2>
                </div>
                <button
                  onClick={() => setShowProfilePage(false)}
                  className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-sm text-slate-200 transition hover:border-slate-500"
                >
                  Close
                </button>
              </div>

              <div className="grid gap-0 lg:grid-cols-[300px_1fr]">
                <aside className="border-b border-slate-800 bg-slate-950/70 p-6 lg:border-b-0 lg:border-r">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 text-xl font-bold text-white">
                      DU
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-white">{profileData.name}</p>
                      <p className="text-sm text-emerald-300">{profileData.accountStatus}</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    {[
                      { key: "overview", label: "Edit Profile" },
                      { key: "security", label: "Security" },
                      { key: "settings", label: "Settings" },
                      { key: "logout", label: "Logout" },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setProfileTab(tab.key as typeof profileTab)}
                        className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                          profileTab === tab.key
                            ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-200"
                            : "border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <span>{tab.label}</span>
                        <span className="text-slate-500">→</span>
                      </button>
                    ))}
                  </div>
                </aside>

                <div className="p-6 sm:p-8">
                  {profileTab === "overview" && (
                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-400">Profile details</p>
                          <h3 className="mt-1 text-2xl font-semibold text-white">Demo User Overview</h3>
                        </div>
                        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/30">
                          Verified
                        </span>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                          <p className="text-sm text-slate-400">Full Name</p>
                          <p className="mt-2 text-lg font-semibold text-white">{profileData.name}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                          <p className="text-sm text-slate-400">Member ID</p>
                          <p className="mt-2 text-lg font-semibold text-cyan-300">{profileData.memberId}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                          <p className="text-sm text-slate-400">Phone Number</p>
                          <p className="mt-2 text-lg font-semibold text-white">{profileData.phone}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                          <p className="text-sm text-slate-400">Email Address</p>
                          <p className="mt-2 text-sm font-semibold text-white">{profileData.email}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                          <p className="text-sm text-slate-400">Member Since</p>
                          <p className="mt-2 text-lg font-semibold text-white">{profileData.joinDate}</p>
                        </div>
                        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                          <p className="text-sm text-emerald-400">Account Status</p>
                          <p className="mt-2 text-lg font-semibold text-emerald-300">{profileData.accountStatus}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {profileTab === "security" && (
                    <div className="space-y-5">
                      <div>
                        <p className="text-sm text-slate-400">Security</p>
                        <h3 className="mt-1 text-2xl font-semibold text-white">Protection settings</h3>
                      </div>

                      <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">Two-Factor Authentication</span>
                          <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/30">Enabled</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">Password</span>
                          <span className="text-slate-200">Last updated 14 days ago</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">Recovery Email</span>
                          <span className="text-slate-200">d*********@gogoritech.com</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {profileTab === "settings" && (
                    <div className="space-y-5">
                      <div>
                        <p className="text-sm text-slate-400">Preferences</p>
                        <h3 className="mt-1 text-2xl font-semibold text-white">Account settings</h3>
                      </div>

                      <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">Language</span>
                          <span className="text-slate-200">English (Nigeria)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">Notifications</span>
                          <span className="text-slate-200">Enabled</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">Theme</span>
                          <span className="text-slate-200">Dark mode</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {profileTab === "logout" && (
                    <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
                      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 text-3xl">👋</div>
                      <h3 className="text-2xl font-semibold text-white">Demo logout</h3>
                      <p className="mt-2 max-w-md text-slate-400">
                        This is a mock account session. No real authentication is connected yet.
                      </p>
                      <button
                        onClick={() => {
                          setShowProfilePage(false);
                          alert("Demo logout complete. No real auth was used.");
                        }}
                        className="mt-6 rounded-lg bg-cyan-500 px-5 py-2.5 font-semibold text-white transition hover:bg-cyan-600"
                      >
                        Confirm Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transactions Page */}
        {showTransactionsPage && (
          <div className="fixed inset-0 z-50 bg-slate-950/95 p-4 backdrop-blur-sm sm:p-6">
            <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/95 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Transactions</p>
                  <h2 className="mt-1 text-2xl font-semibold text-white">All Activity</h2>
                </div>
                <button
                  onClick={() => setShowTransactionsPage(false)}
                  className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-sm text-slate-200 transition hover:border-slate-500"
                >
                  Close
                </button>
              </div>

              <div className="space-y-5 p-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-400">Total Transactions</p>
                    <p className="mt-2 text-2xl font-bold text-white">{allTransactions.length}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-400">Successful</p>
                    <p className="mt-2 text-2xl font-bold text-emerald-400">
                      {allTransactions.filter((item) => item.status === "Success").length}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-sm text-slate-400">Pending</p>
                    <p className="mt-2 text-2xl font-bold text-amber-400">
                      {allTransactions.filter((item) => item.status === "Pending").length}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="grid gap-4 md:grid-cols-[1.4fr_0.9fr_0.9fr]">
                    <div>
                      <label className="mb-2 block text-sm text-slate-300">Search</label>
                      <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by ID, provider or service"
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-slate-300">Service</label>
                      <select
                        value={serviceFilter}
                        onChange={(e) => setServiceFilter(e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="All">All</option>
                        <option value="Airtime">Airtime</option>
                        <option value="Data">Data</option>
                        <option value="Electricity">Electricity</option>
                        <option value="Cable TV">Cable TV</option>
                        <option value="Wallet Topup">Wallet Topup</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-slate-300">Status</label>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-white focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="All">All</option>
                        <option value="Success">Success</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-800">
                  <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
                    <thead className="bg-slate-950/80 text-slate-300">
                      <tr>
                        <th className="px-4 py-3 font-medium">Transaction ID</th>
                        <th className="px-4 py-3 font-medium">Service</th>
                        <th className="px-4 py-3 font-medium">Provider</th>
                        <th className="px-4 py-3 font-medium">Amount</th>
                        <th className="px-4 py-3 font-medium">Date</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                      {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((transaction) => (
                          <tr key={transaction.id} className="hover:bg-slate-800/60">
                            <td className="px-4 py-3 text-cyan-300">{transaction.txId}</td>
                            <td className="px-4 py-3 text-slate-100">{transaction.type}</td>
                            <td className="px-4 py-3 text-slate-300">{transaction.provider}</td>
                            <td className={`px-4 py-3 font-medium ${transaction.amount > 0 ? "text-emerald-400" : "text-red-400"}`}>
                              {transaction.amount > 0 ? "+" : ""}₦{Math.abs(transaction.amount).toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-slate-300 text-xs">{transaction.date}</td>
                            <td className="px-4 py-3">
                              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                                transaction.status === "Success"
                                  ? "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30"
                                  : transaction.status === "Pending"
                                    ? "bg-amber-500/15 text-amber-300 ring-amber-500/30"
                                    : "bg-red-500/15 text-red-300 ring-red-500/30"
                              }`}>
                                {transaction.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-4 py-12 text-center text-slate-400">
                            No transactions match your search and filters.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wallet Top Up Modal */}
        {showWalletTopUpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900/95 shadow-2xl">
              {purchaseStatus === "form" && (
                <div className="p-6 sm:p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-white">Wallet Top Up 💳</h2>
                    <button
                      onClick={() => setShowWalletTopUpModal(false)}
                      className="text-2xl text-slate-400 hover:text-slate-200"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">Top-up Amount</label>
                        <div className="grid grid-cols-2 gap-2">
                          {walletTopUpAmounts.map((amount) => (
                            <button
                              key={amount}
                              onClick={() => {
                                setWalletTopUpAmount(amount);
                                setCustomWalletAmount("");
                              }}
                              className={`rounded-lg border-2 py-3 px-3 text-sm font-semibold transition ${
                                walletTopUpAmount === amount
                                  ? "border-cyan-500 bg-cyan-500/20 text-cyan-300"
                                  : "border-slate-700 bg-slate-950/60 text-slate-300 hover:border-slate-600"
                              }`}
                            >
                              ₦{amount.toLocaleString()}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Custom Amount</label>
                        <input
                          type="number"
                          min="100"
                          value={customWalletAmount}
                          onChange={(e) => {
                            setCustomWalletAmount(e.target.value);
                            setWalletTopUpAmount(null);
                          }}
                          placeholder="Enter custom amount"
                          className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                        />
                        <p className="mt-1 text-xs text-slate-400">Demo values only. No real payment gateway is connected.</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">Payment Method</label>
                        <div className="space-y-2">
                          {paymentMethods.map((method) => (
                            <button
                              key={method.id}
                              onClick={() => setSelectedPaymentMethod(method.name)}
                              className={`flex w-full items-center justify-between rounded-lg border-2 py-3 px-4 text-sm font-semibold transition ${
                                selectedPaymentMethod === method.name
                                  ? "border-cyan-500 bg-cyan-500/20 text-cyan-300"
                                  : "border-slate-700 bg-slate-950/60 text-slate-300 hover:border-slate-600"
                              }`}
                            >
                              <span>{method.icon} {method.name}</span>
                              <span className="text-xs text-slate-400">Demo</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5 h-fit">
                      <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>

                      <div className="space-y-3 border-b border-slate-700 pb-4 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Current Balance</span>
                          <span className="text-white font-medium">₦{walletData.balance.toLocaleString("en-NG")}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Top Up Amount</span>
                          <span className="text-white font-medium">₦{walletTopUpValue.toLocaleString("en-NG")}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Payment Method</span>
                          <span className="text-white font-medium">{selectedPaymentMethod || "Not selected"}</span>
                        </div>
                      </div>

                      <div className="mb-5 flex justify-between border-t border-slate-700 pt-4">
                        <span className="text-base font-semibold text-white">New Balance</span>
                        <span className="text-xl font-bold text-cyan-400">₦{finalWalletBalance.toLocaleString("en-NG")}</span>
                      </div>

                      <div className="space-y-2 mb-4 text-xs text-slate-400">
                        <p>✓ Mock transaction only</p>
                        <p>✓ Demo payment method</p>
                        <p>✓ Instant wallet update</p>
                      </div>

                      <button
                        onClick={() => {
                          if (!selectedPaymentMethod || walletTopUpValue <= 0) {
                            alert("Please select a payment method and enter a valid top-up amount");
                            return;
                          }
                          setPurchaseStatus("processing");
                          setTimeout(() => {
                            const ref = `WLT-${Date.now()}`;
                            setTransactionRef(ref);
                            setPurchaseStatus("success");
                          }, 2000);
                        }}
                        className="w-full rounded-lg bg-cyan-500 py-2.5 font-semibold text-white transition hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!selectedPaymentMethod || walletTopUpValue <= 0}
                      >
                        Confirm Top Up
                      </button>

                      <button
                        onClick={() => setShowWalletTopUpModal(false)}
                        className="mt-2 w-full rounded-lg border border-slate-700 py-2.5 font-medium text-slate-300 transition hover:border-slate-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {purchaseStatus === "processing" && (
                <div className="flex h-96 flex-col items-center justify-center p-8">
                  <div className="mb-6 h-16 w-16 rounded-full border-4 border-slate-700 border-t-cyan-500 animate-spin" />
                  <h2 className="text-xl font-semibold text-white">Processing Top Up</h2>
                  <p className="mt-2 text-slate-400">Please wait while we simulate your wallet funding...</p>
                </div>
              )}

              {purchaseStatus === "success" && (
                <div className="p-8 text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20">
                    <span className="text-4xl">✓</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-2">Top Up Successful!</h2>
                  <p className="text-slate-400 mb-6">Your wallet has been credited successfully in this demo.</p>

                  <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5 mb-6 space-y-3 text-left">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Amount</span>
                      <span className="text-white font-medium">₦{walletTopUpValue.toLocaleString("en-NG")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Payment Method</span>
                      <span className="text-white font-medium">{selectedPaymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">New Balance</span>
                      <span className="text-cyan-400 font-medium">₦{finalWalletBalance.toLocaleString("en-NG")}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-slate-700">
                      <span className="text-slate-400">Reference</span>
                      <span className="text-cyan-400 font-medium text-sm">{transactionRef}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowWalletTopUpModal(false)}
                    className="w-full rounded-lg bg-cyan-500 py-2.5 font-semibold text-white transition hover:bg-cyan-600"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Airtime Purchase Modal */}
        {showAirtimeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900/95 shadow-2xl">
              {purchaseStatus === "form" && (
                <div className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-white">Buy Airtime 📱</h2>
                    <button
                      onClick={() => setShowAirtimeModal(false)}
                      className="text-2xl text-slate-400 hover:text-slate-200"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Form Content */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    {/* Left Column - Form */}
                    <div className="space-y-5">
                      {/* Network Selection */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">Select Network</label>
                        <div className="grid grid-cols-2 gap-2">
                          {networks.map((network) => (
                            <button
                              key={network.id}
                              onClick={() => setSelectedNetwork(network.code)}
                              className={`rounded-lg border-2 py-3 px-4 text-sm font-semibold transition ${
                                selectedNetwork === network.code
                                  ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                                  : "border-slate-700 bg-slate-950/60 text-slate-300 hover:border-slate-600"
                              }`}
                            >
                              <span className={network.color}>{network.icon || network.name}</span>
                              <div className="mt-1">{network.name}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Enter phone number"
                          className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                        />
                        <p className="mt-1 text-xs text-slate-400">e.g., 08012345678 or +2348012345678</p>
                      </div>

                      {/* Amount Selection */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">Amount</label>
                        <div className="grid grid-cols-2 gap-2">
                          {airtimeAmounts.map((plan) => (
                            <button
                              key={plan.id}
                              onClick={() => setSelectedAmount(plan.amount)}
                              className={`rounded-lg border-2 py-2.5 px-3 text-sm font-semibold transition ${
                                selectedAmount === plan.amount
                                  ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                                  : "border-slate-700 bg-slate-950/60 text-slate-300 hover:border-slate-600"
                              }`}
                            >
                              <div>₦{plan.amount.toLocaleString()}</div>
                              {plan.bonus > 0 && (
                                <div className="text-xs text-emerald-400 mt-0.5">+₦{plan.bonus}</div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Summary */}
                    <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5 h-fit">
                      <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>

                      <div className="space-y-3 border-b border-slate-700 pb-4 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Network</span>
                          <span className="text-white font-medium">{selectedNetworkName || "Not selected"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Phone</span>
                          <span className="text-white font-medium">{phoneNumber || "Not entered"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Amount</span>
                          <span className="text-white font-medium">
                            {selectedAmount ? `₦${selectedAmount.toLocaleString()}` : "Not selected"}
                          </span>
                        </div>
                      </div>

                      {selectedAmountBonus > 0 && (
                        <div className="mb-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3">
                          <p className="text-xs text-emerald-300 font-medium">
                            🎁 Bonus: +₦{selectedAmountBonus.toLocaleString()}
                          </p>
                        </div>
                      )}

                      <div className="mb-5 flex justify-between border-t border-slate-700 pt-4">
                        <span className="text-base font-semibold text-white">Total</span>
                        <span className="text-xl font-bold text-emerald-400">
                          {selectedAmount ? `₦${selectedAmount.toLocaleString()}` : "₦0"}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4 text-xs text-slate-400">
                        <p>✓ Instant delivery</p>
                        <p>✓ Secure transaction</p>
                        <p>✓ 24/7 support</p>
                      </div>

                      <button
                        onClick={handleConfirmPurchase}
                        className="w-full rounded-lg bg-emerald-500 py-2.5 font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!selectedNetwork || !phoneNumber || !selectedAmount}
                      >
                        Confirm Purchase
                      </button>

                      <button
                        onClick={() => {
                          setShowAirtimeModal(false);
                          setPurchaseStatus("form");
                          setPurchaseError("");
                        }}
                        className="mt-2 w-full rounded-lg border border-slate-700 py-2.5 font-medium text-slate-300 transition hover:border-slate-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {purchaseStatus === "processing" && (
                <div className="flex h-96 flex-col items-center justify-center p-8">
                  <div className="mb-6 h-16 w-16 rounded-full border-4 border-slate-700 border-t-emerald-500 animate-spin" />
                  <h2 className="text-xl font-semibold text-white">Processing Payment</h2>
                  <p className="mt-2 text-slate-400">Please wait while we process your airtime purchase...</p>
                </div>
              )}

              {purchaseStatus === "success" && (
                <div className="p-8 text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                    <span className="text-4xl">✓</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-2">Purchase Successful!</h2>
                  <p className="text-slate-400 mb-6">Your airtime purchase request was accepted in the Sogo sandbox environment.</p>

                  <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5 mb-6 space-y-3 text-left">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Network</span>
                      <span className="text-white font-medium">{selectedNetworkName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Phone</span>
                      <span className="text-white font-medium">{phoneNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Amount</span>
                      <span className="text-white font-medium">₦{selectedAmount?.toLocaleString()}</span>
                    </div>
                    {selectedAmountBonus > 0 && (
                      <div className="flex justify-between pt-3 border-t border-slate-700">
                        <span className="text-emerald-400">Bonus Received</span>
                        <span className="text-emerald-400 font-medium">+₦{selectedAmountBonus.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-3 border-t border-slate-700">
                      <span className="text-slate-400">Reference</span>
                      <span className="text-cyan-400 font-medium text-sm">{transactionRef}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowAirtimeModal(false);
                      setPurchaseStatus("form");
                      setPurchaseError("");
                    }}
                    className="w-full rounded-lg bg-emerald-500 py-2.5 font-semibold text-white transition hover:bg-emerald-600"
                  >
                    Close
                  </button>
                </div>
              )}

              {purchaseStatus === "error" && (
                <div className="p-8 text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
                    <span className="text-4xl">!</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-2">Purchase Failed</h2>
                  <p className="text-red-300 mb-6">{purchaseError || "The airtime purchase could not be completed."}</p>

                  <button
                    onClick={() => {
                      setPurchaseError("");
                      setPurchaseStatus("form");
                    }}
                    className="w-full rounded-lg bg-red-500 py-2.5 font-semibold text-white transition hover:bg-red-600"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Data Purchase Modal */}
        {showDataModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900/95 shadow-2xl">
              {purchaseStatus === "form" && (
                <div className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-white">Buy Data 📊</h2>
                    <button
                      onClick={() => setShowDataModal(false)}
                      className="text-2xl text-slate-400 hover:text-slate-200"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Form Content */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    {/* Left Column - Form */}
                    <div className="space-y-5">
                      {/* Network Selection */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">Select Network</label>
                        <div className="grid grid-cols-2 gap-2">
                          {networks.map((network) => (
                            <button
                              key={network.id}
                              onClick={() => setSelectedNetwork(network.code)}
                              className={`rounded-lg border-2 py-3 px-4 text-sm font-semibold transition ${
                                selectedNetwork === network.code
                                  ? "border-cyan-500 bg-cyan-500/20 text-cyan-300"
                                  : "border-slate-700 bg-slate-950/60 text-slate-300 hover:border-slate-600"
                              }`}
                            >
                              <span className={network.color}>{network.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Enter phone number"
                          className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                        />
                        <p className="mt-1 text-xs text-slate-400">e.g., 08012345678 or +2348012345678</p>
                      </div>

                      {/* Data Plans */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">Select Plan</label>
                        <div className="space-y-2">
                          {dataPlans.map((plan) => (
                            <button
                              key={plan.id}
                              onClick={() => setSelectedPlan(plan.size)}
                              className={`w-full rounded-lg border-2 py-3 px-4 text-left text-sm font-semibold transition ${
                                selectedPlan === plan.size
                                  ? "border-cyan-500 bg-cyan-500/20 text-cyan-300"
                                  : "border-slate-700 bg-slate-950/60 text-slate-300 hover:border-slate-600"
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="font-bold">{plan.size}</div>
                                  <div className="text-xs text-slate-400 mt-0.5">Validity: {plan.validity}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold">₦{plan.price.toLocaleString()}</div>
                                  {plan.bonus !== "0MB" && (
                                    <div className="text-xs text-cyan-400 mt-0.5">+{plan.bonus}</div>
                                  )}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Summary */}
                    <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5 h-fit">
                      <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>

                      <div className="space-y-3 border-b border-slate-700 pb-4 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Network</span>
                          <span className="text-white font-medium">{selectedNetwork ? networks.find((n) => n.code === selectedNetwork)?.name : "Not selected"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Phone</span>
                          <span className="text-white font-medium">{phoneNumber || "Not entered"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Data Plan</span>
                          <span className="text-white font-medium">{selectedPlan || "Not selected"}</span>
                        </div>
                      </div>

                      {selectedPlan && (
                        <div className="mb-4">
                          {dataPlans.map((plan) => (
                            plan.size === selectedPlan && (
                              <div key={plan.id}>
                                {plan.bonus !== "0MB" && (
                                  <div className="mb-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30 p-3">
                                    <p className="text-xs text-cyan-300 font-medium">
                                      🎁 Bonus: +{plan.bonus}
                                    </p>
                                  </div>
                                )}
                              </div>
                            )
                          ))}
                        </div>
                      )}

                      <div className="mb-5 flex justify-between border-t border-slate-700 pt-4">
                        <span className="text-base font-semibold text-white">Total</span>
                        <span className="text-xl font-bold text-cyan-400">
                          {selectedPlan
                            ? `₦${dataPlans.find((p) => p.size === selectedPlan)?.price.toLocaleString() || "0"}`
                            : "₦0"}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4 text-xs text-slate-400">
                        <p>✓ Instant activation</p>
                        <p>✓ Secure transaction</p>
                        <p>✓ 24/7 support</p>
                      </div>

                      <button
                        onClick={() => {
                          if (!selectedNetwork || !phoneNumber || !selectedPlan) {
                            alert("Please fill in all fields");
                            return;
                          }
                          if (phoneNumber.replace(/\D/g, "").length < 10) {
                            alert("Please enter a valid phone number");
                            return;
                          }
                          setPurchaseStatus("processing");
                          setTimeout(() => {
                            const ref = `TXN-${Date.now()}`;
                            setTransactionRef(ref);
                            setPurchaseStatus("success");
                          }, 2000);
                        }}
                        className="w-full rounded-lg bg-cyan-500 py-2.5 font-semibold text-white transition hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!selectedNetwork || !phoneNumber || !selectedPlan}
                      >
                        Confirm Purchase
                      </button>

                      <button
                        onClick={() => setShowDataModal(false)}
                        className="mt-2 w-full rounded-lg border border-slate-700 py-2.5 font-medium text-slate-300 transition hover:border-slate-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {purchaseStatus === "processing" && (
                <div className="flex h-96 flex-col items-center justify-center p-8">
                  <div className="mb-6 h-16 w-16 rounded-full border-4 border-slate-700 border-t-cyan-500 animate-spin" />
                  <h2 className="text-xl font-semibold text-white">Processing Payment</h2>
                  <p className="mt-2 text-slate-400">Please wait while we process your data purchase...</p>
                </div>
              )}

              {purchaseStatus === "success" && (
                <div className="p-8 text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20">
                    <span className="text-4xl">✓</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-2">Purchase Successful!</h2>
                  <p className="text-slate-400 mb-6">Your data plan has been activated successfully</p>

                  <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5 mb-6 space-y-3 text-left">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Network</span>
                      <span className="text-white font-medium">{networks.find((n) => n.code === selectedNetwork)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Phone</span>
                      <span className="text-white font-medium">{phoneNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Data Plan</span>
                      <span className="text-white font-medium">{selectedPlan}</span>
                    </div>
                    {selectedPlan && dataPlans.find((p) => p.size === selectedPlan)?.bonus !== "0MB" && (
                      <div className="flex justify-between pt-3 border-t border-slate-700">
                        <span className="text-cyan-400">Bonus Data</span>
                        <span className="text-cyan-400 font-medium">+{dataPlans.find((p) => p.size === selectedPlan)?.bonus}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm pt-3 border-t border-slate-700">
                      <span className="text-slate-400">Amount Paid</span>
                      <span className="text-white font-medium">₦{dataPlans.find((p) => p.size === selectedPlan)?.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-slate-700">
                      <span className="text-slate-400">Reference</span>
                      <span className="text-cyan-400 font-medium text-sm">{transactionRef}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowDataModal(false)}
                    className="w-full rounded-lg bg-cyan-500 py-2.5 font-semibold text-white transition hover:bg-cyan-600"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Electricity Payment Modal */}
        {showElectricityModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900/95 shadow-2xl">
              {purchaseStatus === "form" && (
                <div className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-white">Pay Electricity ⚡</h2>
                    <button
                      onClick={() => setShowElectricityModal(false)}
                      className="text-2xl text-slate-400 hover:text-slate-200"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Form Content */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    {/* Left Column - Form */}
                    <div className="space-y-5">
                      {/* Provider Selection */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">Select Provider</label>
                        <div className="grid grid-cols-2 gap-2">
                          {electricityProviders.map((provider) => (
                            <button
                              key={provider.id}
                              onClick={() => setSelectedProvider(provider.code)}
                              className={`rounded-lg border-2 py-3 px-4 text-sm font-semibold transition ${
                                selectedProvider === provider.code
                                  ? "border-yellow-500 bg-yellow-500/20 text-yellow-300"
                                  : "border-slate-700 bg-slate-950/60 text-slate-300 hover:border-slate-600"
                              }`}
                            >
                              <div className="font-bold">{provider.name}</div>
                              <div className="text-xs text-slate-400 mt-0.5">{provider.region}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Meter Type Selection */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">Meter Type</label>
                        <div className="grid grid-cols-2 gap-2">
                          {meterTypes.map((type) => (
                            <button
                              key={type.id}
                              onClick={() => setSelectedMeterType(type.code)}
                              className={`rounded-lg border-2 py-3 px-4 text-sm font-semibold transition ${
                                selectedMeterType === type.code
                                  ? "border-yellow-500 bg-yellow-500/20 text-yellow-300"
                                  : "border-slate-700 bg-slate-950/60 text-slate-300 hover:border-slate-600"
                              }`}
                            >
                              {type.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Meter Number */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Meter Number</label>
                        <input
                          type="text"
                          value={meterNumber}
                          onChange={(e) => setMeterNumber(e.target.value.replace(/\D/g, "").slice(0, 11))}
                          placeholder="Enter meter number"
                          maxLength={11}
                          className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-white placeholder-slate-500 focus:border-yellow-500 focus:outline-none font-mono"
                        />
                        <p className="mt-1 text-xs text-slate-400">11-digit meter number</p>
                      </div>

                      {/* Amount Selection */}
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">Amount</label>
                        <div className="grid grid-cols-2 gap-2">
                          {electricityAmounts.map((plan) => (
                            <button
                              key={plan.id}
                              onClick={() => setSelectedAmount(plan.amount)}
                              className={`rounded-lg border-2 py-2.5 px-3 text-sm font-semibold transition ${
                                selectedAmount === plan.amount
                                  ? "border-yellow-500 bg-yellow-500/20 text-yellow-300"
                                  : "border-slate-700 bg-slate-950/60 text-slate-300 hover:border-slate-600"
                              }`}
                            >
                              <div>₦{plan.amount.toLocaleString()}</div>
                              {plan.discount > 0 && (
                                <div className="text-xs text-yellow-400 mt-0.5">-₦{plan.discount}</div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Summary */}
                    <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5 h-fit">
                      <h3 className="text-lg font-semibold text-white mb-4">Payment Summary</h3>

                      <div className="space-y-3 border-b border-slate-700 pb-4 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Provider</span>
                          <span className="text-white font-medium">
                            {selectedProvider ? electricityProviders.find((p) => p.code === selectedProvider)?.name : "Not selected"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Meter Type</span>
                          <span className="text-white font-medium">
                            {selectedMeterType ? meterTypes.find((t) => t.code === selectedMeterType)?.name : "Not selected"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Meter Number</span>
                          <span className="text-white font-medium">{meterNumber || "Not entered"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Amount</span>
                          <span className="text-white font-medium">
                            {selectedAmount ? `₦${selectedAmount.toLocaleString()}` : "Not selected"}
                          </span>
                        </div>
                      </div>

                      {selectedAmount && (
                        <div>
                          {electricityAmounts.map((plan) => (
                            plan.amount === selectedAmount && plan.discount > 0 && (
                              <div key={plan.id} className="mb-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 p-3">
                                <p className="text-xs text-yellow-300 font-medium">
                                  💳 Cashback: -₦{plan.discount.toLocaleString()}
                                </p>
                              </div>
                            )
                          ))}
                        </div>
                      )}

                      <div className="mb-5 flex justify-between border-t border-slate-700 pt-4">
                        <span className="text-base font-semibold text-white">Total Amount</span>
                        <span className="text-xl font-bold text-yellow-400">
                          {selectedAmount ? `₦${selectedAmount.toLocaleString()}` : "₦0"}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4 text-xs text-slate-400">
                        <p>✓ Instant payment</p>
                        <p>✓ Secure transaction</p>
                        <p>✓ 24/7 support</p>
                      </div>

                      <button
                        onClick={() => {
                          if (!selectedProvider || !selectedMeterType || !meterNumber || !selectedAmount) {
                            alert("Please fill in all fields");
                            return;
                          }
                          if (meterNumber.length !== 11) {
                            alert("Meter number must be 11 digits");
                            return;
                          }
                          setPurchaseStatus("processing");
                          setTimeout(() => {
                            const ref = `TXN-${Date.now()}`;
                            setTransactionRef(ref);
                            setPurchaseStatus("success");
                          }, 2000);
                        }}
                        className="w-full rounded-lg bg-yellow-500 py-2.5 font-semibold text-white transition hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!selectedProvider || !selectedMeterType || !meterNumber || !selectedAmount}
                      >
                        Confirm Payment
                      </button>

                      <button
                        onClick={() => setShowElectricityModal(false)}
                        className="mt-2 w-full rounded-lg border border-slate-700 py-2.5 font-medium text-slate-300 transition hover:border-slate-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {purchaseStatus === "processing" && (
                <div className="flex h-96 flex-col items-center justify-center p-8">
                  <div className="mb-6 h-16 w-16 rounded-full border-4 border-slate-700 border-t-yellow-500 animate-spin" />
                  <h2 className="text-xl font-semibold text-white">Processing Payment</h2>
                  <p className="mt-2 text-slate-400">Please wait while we process your electricity payment...</p>
                </div>
              )}

              {purchaseStatus === "success" && (
                <div className="p-8 text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/20">
                    <span className="text-4xl">✓</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-2">Payment Successful!</h2>
                  <p className="text-slate-400 mb-6">Your electricity payment has been processed successfully</p>

                  <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5 mb-6 space-y-3 text-left">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Provider</span>
                      <span className="text-white font-medium">{electricityProviders.find((p) => p.code === selectedProvider)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Meter Type</span>
                      <span className="text-white font-medium">{meterTypes.find((t) => t.code === selectedMeterType)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Meter Number</span>
                      <span className="text-white font-medium font-mono">{meterNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-3 border-t border-slate-700">
                      <span className="text-slate-400">Amount Paid</span>
                      <span className="text-white font-medium">₦{selectedAmount?.toLocaleString()}</span>
                    </div>
                    {selectedElectricityDiscount > 0 && (
                      <div className="flex justify-between pt-2 border-t border-slate-700">
                        <span className="text-yellow-400">Cashback Received</span>
                        <span className="text-yellow-400 font-medium">-₦{selectedElectricityDiscount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-3 border-t border-slate-700">
                      <span className="text-slate-400">Reference</span>
                      <span className="text-yellow-400 font-medium text-sm">{transactionRef}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowElectricityModal(false)}
                    className="w-full rounded-lg bg-yellow-500 py-2.5 font-semibold text-white transition hover:bg-yellow-600"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Cable TV Subscription Modal */}
        {showCableTvModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900/95 shadow-2xl">
              {purchaseStatus === "form" && (
                <div className="p-6 sm:p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-white">Cable TV Subscription 📺</h2>
                    <button
                      onClick={() => setShowCableTvModal(false)}
                      className="text-2xl text-slate-400 hover:text-slate-200"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">Select Provider</label>
                        <div className="grid grid-cols-3 gap-2">
                          {cableProviders.map((provider) => (
                            <button
                              key={provider.id}
                              onClick={() => {
                                setSelectedCableProvider(provider.code);
                                setSelectedCablePackage(null);
                              }}
                              className={`rounded-lg border-2 py-3 px-3 text-sm font-semibold transition ${
                                selectedCableProvider === provider.code
                                  ? "border-violet-500 bg-violet-500/20 text-violet-300"
                                  : "border-slate-700 bg-slate-950/60 text-slate-300 hover:border-slate-600"
                              }`}
                            >
                              <div className={provider.color}>{provider.name}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Smart Card / IUC Number</label>
                        <input
                          type="text"
                          value={smartCardNumber}
                          onChange={(e) => setSmartCardNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          placeholder="Enter smart card or IUC number"
                          maxLength={10}
                          className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-white placeholder-slate-500 focus:border-violet-500 focus:outline-none font-mono"
                        />
                        <p className="mt-1 text-xs text-slate-400">10-digit smart card / IUC number</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">Select Package</label>
                        <div className="space-y-2">
                          {cablePackages
                            .filter((pkg) => !selectedCableProvider || pkg.provider === selectedCableProvider)
                            .map((pkg) => (
                              <button
                                key={pkg.id}
                                onClick={() => setSelectedCablePackage(pkg.name)}
                                className={`w-full rounded-lg border-2 py-3 px-4 text-left text-sm font-semibold transition ${
                                  selectedCablePackage === pkg.name
                                    ? "border-violet-500 bg-violet-500/20 text-violet-300"
                                    : "border-slate-700 bg-slate-950/60 text-slate-300 hover:border-slate-600"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div>
                                    <div>{pkg.name}</div>
                                    <div className="mt-1 text-xs text-slate-400">{pkg.duration}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-lg font-bold">₦{pkg.price.toLocaleString()}</div>
                                  </div>
                                </div>
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5 h-fit">
                      <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>

                      <div className="space-y-3 border-b border-slate-700 pb-4 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Provider</span>
                          <span className="text-white font-medium">{selectedCableProvider ? cableProviders.find((p) => p.code === selectedCableProvider)?.name : "Not selected"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Package</span>
                          <span className="text-white font-medium">{selectedCablePackage || "Not selected"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Number</span>
                          <span className="text-white font-medium">{smartCardNumber || "Not entered"}</span>
                        </div>
                      </div>

                      <div className="mb-5 flex justify-between border-t border-slate-700 pt-4">
                        <span className="text-base font-semibold text-white">Total</span>
                        <span className="text-xl font-bold text-violet-400">
                          {selectedCablePackage
                            ? `₦${cablePackages.find((pkg) => pkg.name === selectedCablePackage)?.price.toLocaleString() || "0"}`
                            : "₦0"}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4 text-xs text-slate-400">
                        <p>✓ Fast activation</p>
                        <p>✓ Secure transaction</p>
                        <p>✓ 24/7 support</p>
                      </div>

                      <button
                        onClick={() => {
                          if (!selectedCableProvider || !selectedCablePackage || !smartCardNumber) {
                            alert("Please fill in all fields");
                            return;
                          }
                          if (smartCardNumber.length !== 10) {
                            alert("Smart Card / IUC number must be 10 digits");
                            return;
                          }
                          setPurchaseStatus("processing");
                          setTimeout(() => {
                            const ref = `TXN-${Date.now()}`;
                            setTransactionRef(ref);
                            setPurchaseStatus("success");
                          }, 2000);
                        }}
                        className="w-full rounded-lg bg-violet-500 py-2.5 font-semibold text-white transition hover:bg-violet-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!selectedCableProvider || !selectedCablePackage || !smartCardNumber}
                      >
                        Confirm Subscription
                      </button>

                      <button
                        onClick={() => setShowCableTvModal(false)}
                        className="mt-2 w-full rounded-lg border border-slate-700 py-2.5 font-medium text-slate-300 transition hover:border-slate-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {purchaseStatus === "processing" && (
                <div className="flex h-96 flex-col items-center justify-center p-8">
                  <div className="mb-6 h-16 w-16 rounded-full border-4 border-slate-700 border-t-violet-500 animate-spin" />
                  <h2 className="text-xl font-semibold text-white">Processing Subscription</h2>
                  <p className="mt-2 text-slate-400">Please wait while we renew your Cable TV package...</p>
                </div>
              )}

              {purchaseStatus === "success" && (
                <div className="p-8 text-center">
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/20">
                    <span className="text-4xl">✓</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-2">Subscription Successful!</h2>
                  <p className="text-slate-400 mb-6">Your cable TV package has been activated successfully</p>

                  <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5 mb-6 space-y-3 text-left">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Provider</span>
                      <span className="text-white font-medium">{cableProviders.find((p) => p.code === selectedCableProvider)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Package</span>
                      <span className="text-white font-medium">{selectedCablePackage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Smart Card / IUC</span>
                      <span className="text-white font-medium font-mono">{smartCardNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-3 border-t border-slate-700">
                      <span className="text-slate-400">Amount Paid</span>
                      <span className="text-white font-medium">₦{cablePackages.find((pkg) => pkg.name === selectedCablePackage)?.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-slate-700">
                      <span className="text-slate-400">Reference</span>
                      <span className="text-violet-400 font-medium text-sm">{transactionRef}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowCableTvModal(false)}
                    className="w-full rounded-lg bg-violet-500 py-2.5 font-semibold text-white transition hover:bg-violet-600"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

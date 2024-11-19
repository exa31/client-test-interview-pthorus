export interface ResLogin {
  data: {
    token: string;
    nama: string;
    email: string;
  };
}

export interface Voucher {
  id: string;
  nama: string;
  foto: string;
  kategori: string;
  status: string;
}

export interface VoucherClaimed {
  id: string;
  id_user: string;
  id_voucher: string;
  tanggal_claim: string;
  voucher: Voucher;
}

export interface ResGetVouchers {
  data: {
    vouchers: Voucher[];
    countVoucherFood: number;
    countVoucherDrink: number;
    countVoucherTravel: number;
  };
}

export interface ResGetVouchersClaimed {
  data: {
    vouchers: VoucherClaimed[];
    countVoucherFood: number;
    countVoucherDrink: number;
    countVoucherTravel: number;
  };
}

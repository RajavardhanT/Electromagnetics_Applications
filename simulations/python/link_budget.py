"""Free-space wavelength, path loss and Friis link budget."""
import math

C = 299_792_458.0

def wavelength(f_hz):
    return C / f_hz

def fspl_db(f_hz, distance_m):
    lam = wavelength(f_hz)
    return 20.0 * math.log10(4.0 * math.pi * distance_m / lam)

def received_power_dbm(pt_dbm, gt_dbi, gr_dbi, f_hz, distance_m, extra_loss_db=0.0):
    return pt_dbm + gt_dbi + gr_dbi - fspl_db(f_hz, distance_m) - extra_loss_db

if __name__ == "__main__":
    f = 5.8e9
    r = 10.0
    pt, gt, gr = 10.0, 10.0, 10.0
    print(f"Wavelength: {wavelength(f)*100:.3f} cm")
    print(f"FSPL: {fspl_db(f, r):.2f} dB")
    print(f"Received power: {received_power_dbm(pt,gt,gr,f,r):.2f} dBm")

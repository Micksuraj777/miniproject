package EyetissueManage.eye.donor;

import java.util.List;

interface DonorService {
    void addDonor(DonorAddRequestDTO donorAddRequestDTO);
    List<Donor> getDonors();
}

package EyetissueManage.eye.donor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DonorServiceImpl implements DonorService {

    @Autowired
    private DonorRepository donorRepository;

    @Override
    public void addDonor(DonorAddRequestDTO donorAddRequestDTO) {
        Donor donor = new Donor(
                donorAddRequestDTO.getName(),
                donorAddRequestDTO.getAge(),
                donorAddRequestDTO.getGender(), // Added gender here
                donorAddRequestDTO.getContact(),
                donorAddRequestDTO.getAddress(),
                donorAddRequestDTO.getBloodGroup(),
                donorAddRequestDTO.getVisionScore(),
                donorAddRequestDTO.getHlaMatchScore(),
                donorAddRequestDTO.getTissueQualityScore()
        );
        donorRepository.save(donor);
    }

    @Override
    public List<Donor> getDonors() {
        return donorRepository.findAll();
    }
}

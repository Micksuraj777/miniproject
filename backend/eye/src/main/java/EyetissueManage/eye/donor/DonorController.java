package EyetissueManage.eye.donor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("donor")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class DonorController {

    @Autowired
    private DonorServiceImpl donorServiceImpl;

    @GetMapping("health")
    public String checkAlive() {
        return "Donor Controller is alive!";
    }

    @PostMapping
    public String addDonor(@RequestBody DonorAddRequestDTO donorAddRequestDTO) {
        donorServiceImpl.addDonor(donorAddRequestDTO);
        return "Donor added successfully!";
    }

    @GetMapping
    public ResponseEntity<List<Donor>> getDonors() {
        return ResponseEntity.ok(donorServiceImpl.getDonors());
    }
}

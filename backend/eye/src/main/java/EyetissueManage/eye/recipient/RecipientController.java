package EyetissueManage.eye.recipient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("recipient")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class RecipientController {

    @Autowired
    private RecipientServiceImpl recipientServiceImpl;

    @GetMapping("health")
    public String checkAlive() {
        return "Recipient Controller is alive!";
    }

    @PostMapping()
    public String addRecipient(@RequestBody RecipientAddRequestDTO recipientAddRequestDTO) {
        recipientServiceImpl.addRecipient(recipientAddRequestDTO);
        return "Recipient added successfully!";
    }

    @GetMapping()
    public ResponseEntity<List<Recipient>> getRecipients(){
        return ResponseEntity.ok(recipientServiceImpl.getRecipients());
    }
}

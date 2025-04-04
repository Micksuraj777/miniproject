package EyetissueManage.eye.recipient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
class RecipientServiceImpl implements RecipientService {

    private final RecipientRepository recipientRepository;

    @Autowired
    public RecipientServiceImpl(RecipientRepository recipientRepository) {
        this.recipientRepository = recipientRepository;
    }

    @Override
    public void addRecipient(RecipientAddRequestDTO recipientAddRequestDTO) {
        Recipient recipient = new Recipient(
                recipientAddRequestDTO.getName(),
                recipientAddRequestDTO.getAge(),
                recipientAddRequestDTO.getGender(), // Added gender
                recipientAddRequestDTO.getContact(),
                recipientAddRequestDTO.getAddress(),
                recipientAddRequestDTO.getBloodGroup(),
                recipientAddRequestDTO.getVisionScore(),
                recipientAddRequestDTO.getHlaMatchScore(),
                recipientAddRequestDTO.getRecipientUrgencyScore()
        );

        recipientRepository.save(recipient);
    }

    @Override
    public List<Recipient> getRecipients() {
        return recipientRepository.findAll();
    }
}

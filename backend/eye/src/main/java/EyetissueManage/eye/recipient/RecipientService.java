package EyetissueManage.eye.recipient;

import java.util.List;

interface RecipientService {
    public void addRecipient(RecipientAddRequestDTO recipientAddRequestDTO);
    public List<Recipient> getRecipients();
}

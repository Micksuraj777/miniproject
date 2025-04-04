package EyetissueManage.eye.recipient;

class RecipientAddRequestDTO {

    private String name;
    private int age;
    private String gender; // Added gender after age
    private String contact;
    private String address;
    private String bloodGroup;
    private float visionScore;
    private float hlaMatchScore;
    private float recipientUrgencyScore;

    public RecipientAddRequestDTO() {}

    public RecipientAddRequestDTO(String name, int age, String gender, String contact, String address,
                                  String bloodGroup, float visionScore,
                                  float hlaMatchScore, float recipientUrgencyScore) {
        this.name = name;
        this.age = age;
        this.gender = gender; // Assigned gender in constructor
        this.contact = contact;
        this.address = address;
        this.bloodGroup = bloodGroup;
        this.visionScore = visionScore;
        this.hlaMatchScore = hlaMatchScore;
        this.recipientUrgencyScore = recipientUrgencyScore;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }

    public float getVisionScore() {
        return visionScore;
    }

    public void setVisionScore(float visionScore) {
        this.visionScore = visionScore;
    }

    public float getHlaMatchScore() {
        return hlaMatchScore;
    }

    public void setHlaMatchScore(float hlaMatchScore) {
        this.hlaMatchScore = hlaMatchScore;
    }

    public float getRecipientUrgencyScore() {
        return recipientUrgencyScore;
    }

    public void setRecipientUrgencyScore(float recipientUrgencyScore) {
        this.recipientUrgencyScore = recipientUrgencyScore;
    }
}

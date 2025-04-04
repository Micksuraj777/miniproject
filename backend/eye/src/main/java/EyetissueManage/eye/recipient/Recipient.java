package EyetissueManage.eye.recipient;

import jakarta.persistence.*;

@Entity
@Table(name = "recipient")
public class Recipient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "age")
    private int age;

    @Column(name = "gender")
    private String gender; // Added gender after age

    @Column(name = "contact")
    private String contact;

    @Column(name = "address")
    private String address;

    @Column(name = "blood_group")
    private String bloodGroup;

    @Column(name = "vision_score")
    private float visionScore;

    @Column(name = "hla_match_score")
    private float hlaMatchScore;

    @Column(name = "recipient_urgency_score")
    private float recipientUrgencyScore;

    // Constructors
    public Recipient() {}

    public Recipient(String name, int age, String gender, String contact, String address, String bloodGroup,
                     float visionScore, float hlaMatchScore, float recipientUrgencyScore) {
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

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

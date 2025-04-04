package EyetissueManage.eye.donor;

import jakarta.persistence.*;

@Entity
@Table(name = "donor")
public class Donor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "age", nullable = false)
    private int age;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "contact", nullable = false)
    private String contact;

    @Column(name = "address")
    private String address;

    @Column(name = "blood_group", nullable = false)
    private String bloodGroup;

    @Column(name = "vision_score")
    private float visionScore;

    @Column(name = "hla_match_score")
    private float hlaMatchScore;

    @Column(name = "tissue_quality_score")
    private float tissueQualityScore;

    // Constructors
    public Donor() {}

    public Donor(String name, int age, String gender, String contact, String address, String bloodGroup, float visionScore,
                 float hlaMatchScore, float tissueQualityScore) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.contact = contact;
        this.address = address;
        this.bloodGroup = bloodGroup;
        this.visionScore = visionScore;
        this.hlaMatchScore = hlaMatchScore;
        this.tissueQualityScore = tissueQualityScore;
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

    public float getTissueQualityScore() {
        return tissueQualityScore;
    }

    public void setTissueQualityScore(float tissueQualityScore) {
        this.tissueQualityScore = tissueQualityScore;
    }
}

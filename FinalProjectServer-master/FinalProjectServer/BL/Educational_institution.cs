namespace final_proj.BL
{
    public class EducationalInstitution
    {
        private string institutionId;
        private string street;
        private int houseNumber;
        private string city;
        private string principal;
        private string principalCellphone;
        private string secretariatPhone;
        private string secretariatMail;
        private string anotherContact;
        private string contactPhone;
        private string name;
        double lat;
        double lng;

        public EducationalInstitution(string institutionId, string street, int houseNumber, string city, string principal, string principalCellphone, string secretariatPhone, string secretariatMail, string anotherContact, string contactPhone)
        {
            InstitutionId = institutionId;
            Street = street;
            HouseNumber = houseNumber;
            City = city;
            Principal = principal;
            PrincipalCellphone = principalCellphone;
            SecretariatPhone = secretariatPhone;
            SecretariatMail = secretariatMail;
            AnotherContact = anotherContact;
            ContactPhone = contactPhone;
            Name = name;
            Lat = lat;
            Lng = lng;
        }

        public EducationalInstitution() { }

        public string InstitutionId { get => institutionId; set => institutionId = value; }
        public string Street { get => street; set => street = value; }
        public int HouseNumber { get => houseNumber; set => houseNumber = value; }
        public string City { get => city; set => city = value; }
        public string Principal { get => principal; set => principal = value; }
        public string PrincipalCellphone { get => principalCellphone; set => principalCellphone = value; }
        public string SecretariatPhone { get => secretariatPhone; set => secretariatPhone = value; }
        public string SecretariatMail { get => secretariatMail; set => secretariatMail = value; }
        public string AnotherContact { get => anotherContact; set => anotherContact = value; }
        public string ContactPhone { get => contactPhone; set => contactPhone = value; }
        public string Name { get => name; set => name = value; }
        public double Lat { get => lat; set => lat = value; }
        public double Lng { get => lng; set => lng = value; }



        public int Insert()
        {
            DBservicesEducationalInstitution dbs = new DBservicesEducationalInstitution();
            return dbs.InsertEducationalInstitution(this);
        }


        public static List<EducationalInstitution> Read()
        {
            DBservicesEducationalInstitution dbs = new DBservicesEducationalInstitution();
            return dbs.GetEducationalInstitutions();
        }

        public int DeleteEducation(string dd)
        {
            DBservicesEducationalInstitution dbs = new DBservicesEducationalInstitution();
            return dbs.DeleteEducation(dd);
        }

        public int UpdateEducation()
        {
            DBservicesEducationalInstitution dbs = new DBservicesEducationalInstitution();
            return dbs.insertUpdateEducation(this);

        }




    }




}
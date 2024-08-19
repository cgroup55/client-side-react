namespace final_proj.BL
{
    public class TransportationCompany
    {
        private string company_Code;
        private string company_Name;
        private string company_Email;
        private string company_Phone;
        private string manager_Name;
        private string manager_Phone;
        private string company_Street;
        private int company_HomeNum;
        private string company_City;
        private string company_Comments;

    
        public TransportationCompany(string companyCode, string companyName, string companyEmail, string companyPhone,
                                     string managerName, string managerPhone, string companyStreet, int companyHomeNum,
                                     string companyCity, string companyComments)
        {
            Company_Code = companyCode;
            Company_Name = companyName;
            Company_Email = companyEmail;
            Company_Phone = companyPhone;
            Manager_Name = managerName;
            Manager_Phone = managerPhone;
            Company_Street = companyStreet;
            Company_HomeNum = companyHomeNum;
            Company_City = companyCity;
            Company_Comments = companyComments;
        }

        public TransportationCompany() { }

        // Properties
        public string Company_Code { get => company_Code; set => company_Code = value; }
        public string Company_Name { get => company_Name; set => company_Name = value; }
        public string Company_Email { get => company_Email; set => company_Email = value; }
        public string Company_Phone { get => company_Phone; set => company_Phone = value; }
        public string Manager_Name { get => manager_Name; set => manager_Name = value; }
        public string Manager_Phone { get => manager_Phone; set => manager_Phone = value; }
        public string Company_Street { get => company_Street; set => company_Street = value; }
        public int Company_HomeNum { get => company_HomeNum; set => company_HomeNum = value; }
        public string Company_City { get => company_City; set => company_City = value; }
        public string Company_Comments { get => company_Comments; set => company_Comments = value; }

        public int Insert()
        {
            DBservicesTransportation_company dbs = new DBservicesTransportation_company();
            return dbs.InsertTransportationCompany(this);
        }

        // Static method to get a list of all transportation companies
        public static List<TransportationCompany> Read()
        {
            DBservicesTransportation_company dbs = new DBservicesTransportation_company();
            return dbs.GetTransportationCompanies();
        }

        // Method to update a transportation company
        public int Update()
        {
            DBservicesTransportation_company dbs = new DBservicesTransportation_company();
            return dbs.UpdateTransportationCompany(this);
        }

        // Method to delete a transportation company by company code
        public int Delete(string id)
        {
            DBservicesTransportation_company dbs = new DBservicesTransportation_company();
            return dbs.DeleteTransportationCompany(id);
        }

    }
}
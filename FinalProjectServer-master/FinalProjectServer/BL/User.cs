using final_proj.DAL;

namespace final_proj.BL
{
    public class User
    {
        private string userName;
        private string password;
        private int role;

        public User(string userName, string password, int role)
        {
            UserName = userName;
            Password = password;
            Role = role;
        }

        public User() { }

        public string UserName { get => userName; set => userName = value; }
        public string Password { get => password; set => password = value; }
        public int Role { get => role; set => role = value; }

        //Login
        public List<object> Login()
        {
            DBservicesUser dbs = new DBservicesUser();
            return dbs.GetUserByDetails(this);
        }
    }
}

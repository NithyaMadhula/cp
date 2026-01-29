namespace Igt.InstantsShowcase.Models
{
    public sealed class User
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Username { get; set; }

        public bool Enabled { get; set; }

        public Customer Customer { get; set; }
    }
}

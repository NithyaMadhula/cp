using System.Collections.Generic;

namespace IGT.CustomerPortal.API.Model
{
    public sealed class Game
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<Concept> Concepts { get; set; }
    }
}

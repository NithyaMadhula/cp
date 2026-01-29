using System.Collections.Generic;

namespace Igt.InstantsShowcase.Models
{
    public sealed class Game
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<Concept> Concepts { get; set; }
    }
}

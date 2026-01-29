using Microsoft.EntityFrameworkCore.Migrations;

namespace Igt.InstantsShowcase.Data.Migrations
{
    /// <summary>
    /// 
    /// </summary>
    public partial class _20200626OrganizationCode : Migration
    {
        /// <summary>
        /// 
        /// </summary>
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "OrganizationCode",
                table: "AspNetUsers",
                nullable: true);
        }

        /// <summary>
        /// 
        /// </summary>
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrganizationCode",
                table: "AspNetUsers");
        }
    }
}

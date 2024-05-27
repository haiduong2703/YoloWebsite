using Microsoft.EntityFrameworkCore.Migrations;

namespace YoloEcommerce.Migrations
{
    public partial class Uupdate135 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Users_IdUser",
                table: "Contacts");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_IdUser",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "IdUser",
                table: "Contacts");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdUser",
                table: "Contacts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_IdUser",
                table: "Contacts",
                column: "IdUser");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Users_IdUser",
                table: "Contacts",
                column: "IdUser",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

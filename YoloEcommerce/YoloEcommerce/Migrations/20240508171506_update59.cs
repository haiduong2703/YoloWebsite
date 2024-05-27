using Microsoft.EntityFrameworkCore.Migrations;

namespace YoloEcommerce.Migrations
{
    public partial class update59 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdColor",
                table: "OrderDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdSize",
                table: "OrderDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_IdColor",
                table: "OrderDetails",
                column: "IdColor");

            migrationBuilder.CreateIndex(
                name: "IX_OrderDetails_IdSize",
                table: "OrderDetails",
                column: "IdSize");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_Colors_IdColor",
                table: "OrderDetails",
                column: "IdColor",
                principalTable: "Colors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderDetails_Sizes_IdSize",
                table: "OrderDetails",
                column: "IdSize",
                principalTable: "Sizes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_Colors_IdColor",
                table: "OrderDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_OrderDetails_Sizes_IdSize",
                table: "OrderDetails");

            migrationBuilder.DropIndex(
                name: "IX_OrderDetails_IdColor",
                table: "OrderDetails");

            migrationBuilder.DropIndex(
                name: "IX_OrderDetails_IdSize",
                table: "OrderDetails");

            migrationBuilder.DropColumn(
                name: "IdColor",
                table: "OrderDetails");

            migrationBuilder.DropColumn(
                name: "IdSize",
                table: "OrderDetails");
        }
    }
}

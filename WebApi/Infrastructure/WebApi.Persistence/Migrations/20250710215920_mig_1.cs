using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WebApi.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class mig_1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    KullaniciAdi = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    sifre = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppUser",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    AdiSoyadi = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    UserName = table.Column<string>(type: "text", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "text", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUser", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Oteller",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OtelAdi = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Telefon = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    AdresSatiri1 = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Sehir = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Ulke = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Puan = table.Column<decimal>(type: "numeric", nullable: true),
                    AdminId = table.Column<int>(type: "integer", nullable: false),
                    OdaSayisi = table.Column<int>(type: "integer", nullable: false),
                    OtelId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Oteller", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Oteller_Admins_AdminId",
                        column: x => x.AdminId,
                        principalTable: "Admins",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OdaTipleri",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OdaTipiAdi = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Aciklama = table.Column<string>(type: "text", nullable: false),
                    OtelId = table.Column<int>(type: "integer", nullable: false),
                    Kapasite = table.Column<int>(type: "integer", nullable: false),
                    OdaSayisi = table.Column<int>(type: "integer", nullable: false),
                    Fiyat = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    IndirimOrani = table.Column<double>(type: "double precision", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OdaTipleri", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OdaTipleri_Oteller_OtelId",
                        column: x => x.OtelId,
                        principalTable: "Oteller",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OtelResimler",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OtelId = table.Column<int>(type: "integer", nullable: false),
                    ResimUrl = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtelResimler", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OtelResimler_Oteller_OtelId",
                        column: x => x.OtelId,
                        principalTable: "Oteller",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OdaTipiResimler",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    OdaTipiId = table.Column<int>(type: "integer", nullable: false),
                    ResimUrl = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OdaTipiResimler", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OdaTipiResimler_OdaTipleri_OdaTipiId",
                        column: x => x.OdaTipiId,
                        principalTable: "OdaTipleri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Rezervasyonlar",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    OdaTipiId = table.Column<int>(type: "integer", nullable: false),
                    GirisTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CikisTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    RezervasyonTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Durum = table.Column<int>(type: "integer", nullable: false),
                    ToplamUcret = table.Column<decimal>(type: "numeric(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rezervasyonlar", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Rezervasyonlar_AppUser_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AppUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rezervasyonlar_OdaTipleri_OdaTipiId",
                        column: x => x.OdaTipiId,
                        principalTable: "OdaTipleri",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Odemeler",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RezervasyonId = table.Column<int>(type: "integer", nullable: false),
                    Tutar = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    OdemeTarihi = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Yontem = table.Column<int>(type: "integer", nullable: false),
                    Durum = table.Column<int>(type: "integer", nullable: false),
                    KartIsim = table.Column<string>(type: "text", nullable: false),
                    KartNo = table.Column<string>(type: "text", nullable: false),
                    KartSKT = table.Column<string>(type: "text", nullable: false),
                    KartCVV = table.Column<string>(type: "text", nullable: false),
                    AppUserId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Odemeler", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Odemeler_AppUser_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AppUser",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Odemeler_Rezervasyonlar_RezervasyonId",
                        column: x => x.RezervasyonId,
                        principalTable: "Rezervasyonlar",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OdaTipiResimler_OdaTipiId",
                table: "OdaTipiResimler",
                column: "OdaTipiId");

            migrationBuilder.CreateIndex(
                name: "IX_OdaTipleri_OtelId",
                table: "OdaTipleri",
                column: "OtelId");

            migrationBuilder.CreateIndex(
                name: "IX_Odemeler_AppUserId",
                table: "Odemeler",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Odemeler_RezervasyonId",
                table: "Odemeler",
                column: "RezervasyonId");

            migrationBuilder.CreateIndex(
                name: "IX_Oteller_AdminId",
                table: "Oteller",
                column: "AdminId");

            migrationBuilder.CreateIndex(
                name: "IX_OtelResimler_OtelId",
                table: "OtelResimler",
                column: "OtelId");

            migrationBuilder.CreateIndex(
                name: "IX_Rezervasyonlar_AppUserId",
                table: "Rezervasyonlar",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Rezervasyonlar_OdaTipiId",
                table: "Rezervasyonlar",
                column: "OdaTipiId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OdaTipiResimler");

            migrationBuilder.DropTable(
                name: "Odemeler");

            migrationBuilder.DropTable(
                name: "OtelResimler");

            migrationBuilder.DropTable(
                name: "Rezervasyonlar");

            migrationBuilder.DropTable(
                name: "AppUser");

            migrationBuilder.DropTable(
                name: "OdaTipleri");

            migrationBuilder.DropTable(
                name: "Oteller");

            migrationBuilder.DropTable(
                name: "Admins");
        }
    }
}

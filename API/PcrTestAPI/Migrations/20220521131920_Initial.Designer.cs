﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PcrTestAPI.Models.Contexts;

namespace PcrTestAPI.Migrations
{
    [DbContext(typeof(DBContext))]
    [Migration("20220521131920_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("PcrTestAPI.Models.Entities.PcrTestVenue", b =>
                {
                    b.Property<int>("PcrTestVenueId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumberOfSpaces")
                        .HasColumnType("int");

                    b.HasKey("PcrTestVenueId");

                    b.ToTable("PcrTestVenues");

                    b.HasData(
                        new
                        {
                            PcrTestVenueId = 1,
                            Code = "PC00",
                            Name = "G.Gali pharmacy",
                            NumberOfSpaces = 1
                        },
                        new
                        {
                            PcrTestVenueId = 2,
                            Code = "HC00",
                            Name = "Piri health center",
                            NumberOfSpaces = 3
                        });
                });
#pragma warning restore 612, 618
        }
    }
}

﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PcrTestAPI.Models.Contexts;

namespace PcrTestAPI.Migrations
{
    [DbContext(typeof(DBContext))]
    partial class DBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("PcrTestAPI.Models.Entities.PcrTestBooking", b =>
                {
                    b.Property<int>("PcrTestBookingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("IdentityCardNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("PcrTestBookingStatusId")
                        .HasColumnType("int");

                    b.Property<int?>("PcrTestResultId")
                        .HasColumnType("int");

                    b.Property<int>("PcrTestVenueAllocationId")
                        .HasColumnType("int");

                    b.HasKey("PcrTestBookingId");

                    b.HasIndex("PcrTestBookingStatusId");

                    b.HasIndex("PcrTestResultId");

                    b.HasIndex("PcrTestVenueAllocationId");

                    b.ToTable("PcrTestBookings");
                });

            modelBuilder.Entity("PcrTestAPI.Models.Entities.PcrTestBookingStatus", b =>
                {
                    b.Property<int>("PcrTestBookingStatusId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PcrTestBookingStatusId");

                    b.ToTable("PcrTestBookingStatuses");

                    b.HasData(
                        new
                        {
                            PcrTestBookingStatusId = 1,
                            Name = "OnGoing"
                        },
                        new
                        {
                            PcrTestBookingStatusId = 2,
                            Name = "Deleted"
                        },
                        new
                        {
                            PcrTestBookingStatusId = 3,
                            Name = "Closed"
                        });
                });

            modelBuilder.Entity("PcrTestAPI.Models.Entities.PcrTestResult", b =>
                {
                    b.Property<int>("PcrTestResultId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("PcrTestResultTypeId")
                        .HasColumnType("int");

                    b.Property<DateTime>("ResultDate")
                        .HasColumnType("datetime2");

                    b.HasKey("PcrTestResultId");

                    b.HasIndex("PcrTestResultTypeId");

                    b.ToTable("PcrTestResults");
                });

            modelBuilder.Entity("PcrTestAPI.Models.Entities.PcrTestResultType", b =>
                {
                    b.Property<int>("PcrTestResultTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PcrTestResultTypeId");

                    b.ToTable("PcrTestResultTypes");

                    b.HasData(
                        new
                        {
                            PcrTestResultTypeId = 1,
                            Name = "Positive"
                        },
                        new
                        {
                            PcrTestResultTypeId = 2,
                            Name = "Negative"
                        });
                });

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

            modelBuilder.Entity("PcrTestAPI.Models.Entities.PcrTestVenueAllocation", b =>
                {
                    b.Property<int>("PcrTestVenueAllocationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("AllocationDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("PcrTestVenueId")
                        .HasColumnType("int");

                    b.HasKey("PcrTestVenueAllocationId");

                    b.HasIndex("PcrTestVenueId");

                    b.ToTable("PcrTestVenueAllocations");
                });

            modelBuilder.Entity("PcrTestAPI.Models.Entities.__Log", b =>
                {
                    b.Property<long>("__LogId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .UseIdentityColumn();

                    b.Property<string>("LogCallSite")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("LogDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("LogException")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LogIP")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LogLevel")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LogMessage")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LogModule")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LogSessionID")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LogURL")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LogUserID")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("__LogId");

                    b.ToTable("__Logs");
                });

            modelBuilder.Entity("PcrTestAPI.Models.Entities.PcrTestBooking", b =>
                {
                    b.HasOne("PcrTestAPI.Models.Entities.PcrTestBookingStatus", "PcrTestBookingStatus")
                        .WithMany("PcrTestBooking")
                        .HasForeignKey("PcrTestBookingStatusId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PcrTestAPI.Models.Entities.PcrTestResult", "PcrTestResult")
                        .WithMany("PcrTestBooking")
                        .HasForeignKey("PcrTestResultId");

                    b.HasOne("PcrTestAPI.Models.Entities.PcrTestVenueAllocation", "PcrTestVenueAllocation")
                        .WithMany("PcrTestBooking")
                        .HasForeignKey("PcrTestVenueAllocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PcrTestBookingStatus");

                    b.Navigation("PcrTestResult");

                    b.Navigation("PcrTestVenueAllocation");
                });

            modelBuilder.Entity("PcrTestAPI.Models.Entities.PcrTestResult", b =>
                {
                    b.HasOne("PcrTestAPI.Models.Entities.PcrTestResultType", "PcrTestResultType")
                        .WithMany("PcrTestResult")
                        .HasForeignKey("PcrTestResultTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PcrTestResultType");
                });

            modelBuilder.Entity("PcrTestAPI.Models.Entities.PcrTestVenueAllocation", b =>
                {
                    b.HasOne("PcrTestAPI.Models.Entities.PcrTestVenue", "PcrTestVenue")
                        .WithMany("PcrTestVenueAllocations")
                        .HasForeignKey("PcrTestVenueId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PcrTestVenue");
                });

            modelBuilder.Entity("PcrTestAPI.Models.Entities.PcrTestBookingStatus", b =>
                {
                    b.Navigation("PcrTestBooking");
                });

            modelBuilder.Entity("PcrTestAPI.Models.Entities.PcrTestResult", b =>
                {
                    b.Navigation("PcrTestBooking");
                });

            modelBuilder.Entity("PcrTestAPI.Models.Entities.PcrTestResultType", b =>
                {
                    b.Navigation("PcrTestResult");
                });

            modelBuilder.Entity("PcrTestAPI.Models.Entities.PcrTestVenue", b =>
                {
                    b.Navigation("PcrTestVenueAllocations");
                });

            modelBuilder.Entity("PcrTestAPI.Models.Entities.PcrTestVenueAllocation", b =>
                {
                    b.Navigation("PcrTestBooking");
                });
#pragma warning restore 612, 618
        }
    }
}

// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'birth_chart.dart';

// **************************************************************************
// TypeAdapterGenerator
// **************************************************************************

class BirthChartAdapter extends TypeAdapter<BirthChart> {
  @override
  final int typeId = 1;

  @override
  BirthChart read(BinaryReader reader) {
    final numOfFields = reader.readByte();
    final fields = <int, dynamic>{
      for (int i = 0; i < numOfFields; i++) reader.readByte(): reader.read(),
    };
    return BirthChart(
      birthDate: fields[0] as DateTime,
      birthTime: fields[1] as TimeOfDay?,
      placeOfBirth: fields[2] as String,
      latitude: fields[3] as String,
      longitude: fields[4] as String,
      timezone: fields[5] as String,
      planetaryPositions: (fields[6] as Map).cast<String, dynamic>(),
      houses: (fields[7] as Map).cast<String, dynamic>(),
      aspects: (fields[8] as Map).cast<String, dynamic>(),
      westernZodiac: fields[9] as String,
      vedicRashi: fields[10] as String,
      chineseZodiac: fields[11] as String,
      nakshatra: fields[12] as String,
      lifePathNumber: fields[13] as String,
      ascendant: (fields[14] as Map).cast<String, dynamic>(),
      moonSign: (fields[15] as Map).cast<String, dynamic>(),
      sunSign: (fields[16] as Map).cast<String, dynamic>(),
      createdAt: fields[17] as DateTime,
      updatedAt: fields[18] as DateTime,
    );
  }

  @override
  void write(BinaryWriter writer, BirthChart obj) {
    writer
      ..writeByte(19)
      ..writeByte(0)
      ..write(obj.birthDate)
      ..writeByte(1)
      ..write(obj.birthTime)
      ..writeByte(2)
      ..write(obj.placeOfBirth)
      ..writeByte(3)
      ..write(obj.latitude)
      ..writeByte(4)
      ..write(obj.longitude)
      ..writeByte(5)
      ..write(obj.timezone)
      ..writeByte(6)
      ..write(obj.planetaryPositions)
      ..writeByte(7)
      ..write(obj.houses)
      ..writeByte(8)
      ..write(obj.aspects)
      ..writeByte(9)
      ..write(obj.westernZodiac)
      ..writeByte(10)
      ..write(obj.vedicRashi)
      ..writeByte(11)
      ..write(obj.chineseZodiac)
      ..writeByte(12)
      ..write(obj.nakshatra)
      ..writeByte(13)
      ..write(obj.lifePathNumber)
      ..writeByte(14)
      ..write(obj.ascendant)
      ..writeByte(15)
      ..write(obj.moonSign)
      ..writeByte(16)
      ..write(obj.sunSign)
      ..writeByte(17)
      ..write(obj.createdAt)
      ..writeByte(18)
      ..write(obj.updatedAt);
  }

  @override
  int get hashCode => typeId.hashCode;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is BirthChartAdapter &&
          runtimeType == other.runtimeType &&
          typeId == other.typeId;
}

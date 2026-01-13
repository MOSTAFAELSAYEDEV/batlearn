import { ERDEntity, ERDRelationship, ERDSolution } from '../types';

/**
 * Normalizes entity name for comparison
 */
function normalizeName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, '_');
}

/**
 * Compares two ERD entities
 */
function compareEntities(entity1: ERDEntity, entity2: ERDEntity): boolean {
  if (normalizeName(entity1.name) !== normalizeName(entity2.name)) {
    return false;
  }

  if (entity1.type !== entity2.type) {
    return false;
  }

  if (entity1.attributes.length !== entity2.attributes.length) {
    return false;
  }

  // Compare attributes
  const attrs1 = entity1.attributes.map((a) => ({
    name: normalizeName(a.name),
    type: a.type,
    isKey: a.isKey,
  })).sort((a, b) => a.name.localeCompare(b.name));

  const attrs2 = entity2.attributes.map((a) => ({
    name: normalizeName(a.name),
    type: a.type,
    isKey: a.isKey,
  })).sort((a, b) => a.name.localeCompare(b.name));

  for (let i = 0; i < attrs1.length; i++) {
    if (
      attrs1[i].name !== attrs2[i].name ||
      attrs1[i].type !== attrs2[i].type ||
      attrs1[i].isKey !== attrs2[i].isKey
    ) {
      return false;
    }
  }

  return true;
}

/**
 * Compares two ERD relationships
 */
function compareRelationships(
  rel1: ERDRelationship,
  rel2: ERDRelationship,
  entities1: ERDEntity[],
  entities2: ERDEntity[]
): boolean {
  if (normalizeName(rel1.name) !== normalizeName(rel2.name)) {
    return false;
  }

  if (rel1.type !== rel2.type) {
    return false;
  }

  if (rel1.cardinality !== rel2.cardinality) {
    return false;
  }

  if (rel1.entities.length !== rel2.entities.length) {
    return false;
  }

  // Compare entity Names (normalized)
  const names1 = rel1.entities.map(id => {
    const ent = entities1.find(e => e.id === id);
    return ent ? normalizeName(ent.name) : normalizeName(id);
  }).sort();

  const names2 = rel2.entities.map(id => {
    const ent = entities2.find(e => e.id === id);
    return ent ? normalizeName(ent.name) : normalizeName(id);
  }).sort();

  for (let i = 0; i < names1.length; i++) {
    if (names1[i] !== names2[i]) {
      return false;
    }
  }

  return true;
}

/**
 * Validates user's ERD against correct solution
 */
export function validateERD(
  userEntities: ERDEntity[],
  userRelationships: ERDRelationship[],
  correctSolution: ERDSolution
): {
  isCorrect: boolean;
  errors: string[];
  correctSolution: ERDSolution;
} {
  const errors: string[] = [];

  // Check entity count
  if (userEntities.length !== correctSolution.entities.length) {
    errors.push(
      `Entity count mismatch: Expected ${correctSolution.entities.length}, got ${userEntities.length}`
    );
  }

  // Check relationship count
  if (userRelationships.length !== correctSolution.relationships.length) {
    errors.push(
      `Relationship count mismatch: Expected ${correctSolution.relationships.length}, got ${userRelationships.length}`
    );
  }

  // Check each entity
  const userEntityMap = new Map(
    userEntities.map((e) => [normalizeName(e.name), e])
  );
  const correctEntityMap = new Map(
    correctSolution.entities.map((e) => [normalizeName(e.name), e])
  );

  for (const [name, correctEntity] of Array.from(correctEntityMap.entries())) {
    const userEntity = userEntityMap.get(name);
    if (!userEntity) {
      errors.push(`Missing entity: ${correctEntity.name}`);
    } else if (!compareEntities(userEntity, correctEntity)) {
      errors.push(`Entity "${correctEntity.name}" does not match expected structure`);
    }
  }

  // Check for extra entities
  for (const [name, userEntity] of Array.from(userEntityMap.entries())) {
    if (!correctEntityMap.has(name)) {
      errors.push(`Unexpected entity: ${userEntity.name}`);
    }
  }

  // Check each relationship
  const getRelKey = (r: ERDRelationship, entities: ERDEntity[]) => {
    const entityNames = r.entities.map(id => {
      const ent = entities.find(e => e.id === id);
      return ent ? normalizeName(ent.name) : normalizeName(id);
    }).sort().join('_');
    return `${normalizeName(r.name)}_${entityNames}`;
  };

  const userRelMap = new Map(
    userRelationships.map((r) => [getRelKey(r, userEntities), r])
  );
  const correctRelMap = new Map(
    correctSolution.relationships.map((r) => [getRelKey(r, correctSolution.entities), r])
  );

  for (const [key, correctRel] of Array.from(correctRelMap.entries())) {
    const userRel = userRelMap.get(key);
    if (!userRel) {
      errors.push(`Missing or misconfigured relationship: ${correctRel.name} between ${correctRel.entities.map(id => {
        const ent = correctSolution.entities.find(e => e.id === id);
        return ent ? ent.name : id;
      }).join(' and ')}`);
    } else if (!compareRelationships(userRel, correctRel, userEntities, correctSolution.entities)) {
      errors.push(`Relationship "${correctRel.name}" does not match expected structure (cardinality or type)`);
    }
  }

  // Check for extra relationships
  for (const [key, userRel] of Array.from(userRelMap.entries())) {
    if (!correctRelMap.has(key)) {
      errors.push(`Unexpected relationship: ${userRel.name}`);
    }
  }

  return {
    isCorrect: errors.length === 0,
    errors,
    correctSolution,
  };
}
